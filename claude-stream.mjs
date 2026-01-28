#!/usr/bin/env node
import { query } from '@anthropic-ai/claude-agent-sdk';
import { readFileSync } from 'fs';

const promptArg = process.argv[2];
const systemPromptArg = process.argv[3];
const historyFileArg = process.argv[4];
const imagesFileArg = process.argv[5];

if (!promptArg) {
  console.error('Usage: node script.mjs <prompt> [systemPrompt] [historyFile] [imagesFile]');
  process.exit(1);
}

// Read images from JSON file if provided (contains array of {data, type})
let imageData = [];
if (imagesFileArg) {
  try {
    const raw = readFileSync(imagesFileArg, 'utf-8');
    imageData = JSON.parse(raw);
  } catch (e) {
    // Ignore read/parse errors
  }
}

// Check if prompt already contains embedded history (from recreated/expired session)
// If so, skip file-based history to avoid duplication
const hasEmbeddedHistory = promptArg.includes('[Conversation History') || promptArg.includes('[Current Request]');

let fullPrompt = '';
if (hasEmbeddedHistory) {
  // Recreated sandbox: history is already in the prompt from the client
  fullPrompt = promptArg;
} else {
  // Normal flow: read history from file (limited to last 6 pairs, truncated)
  let conversationHistory = [];
  if (historyFileArg) {
    try {
      const historyData = readFileSync(historyFileArg, 'utf-8');
      conversationHistory = JSON.parse(historyData);
    } catch (e) {
      // No history file yet (new project first message) - just use raw prompt
    }
  }

  const MAX_PAIRS = 6;
  const MAX_MSG_LENGTH = 800;
  const recentHistory = conversationHistory.slice(-(MAX_PAIRS * 2));

  if (recentHistory.length > 0) {
    const context = recentHistory
      .map(msg => {
        const content = msg.content.length > MAX_MSG_LENGTH
          ? msg.content.slice(0, MAX_MSG_LENGTH) + '...[truncated]'
          : msg.content;
        return `${msg.role === 'user' ? 'Human' : 'Assistant'}: ${content}`;
      })
      .join('\n\n');
    fullPrompt = `Previous conversation:\n${context}\n\nCurrent request: ${promptArg}`;
  } else {
    fullPrompt = promptArg;
  }
}

// Configure MCP servers from environment variables
const mcpServers = {};
if (process.env.MCP_GATEWAY_URL) {
  mcpServers['tavily'] = {
    type: 'http',
    url: process.env.MCP_GATEWAY_URL
  };
}
if (process.env.GITHUB_TOKEN) {
  mcpServers['github'] = {
    type: 'http',
    url: 'https://api.githubcopilot.com/mcp',
    headers: {
      'Authorization': 'Bearer ' + process.env.GITHUB_TOKEN
    }
  };
}
// Playwright MCP for browser automation
mcpServers['playwright'] = {
  command: 'npx',
  args: ['@playwright/mcp@latest']
};
// Context7 MCP for documentation search
mcpServers['context7'] = {
  type: 'http',
  url: 'https://mcp.context7.com/mcp',
  headers: {
    CONTEXT7_API_KEY: 'ctx7sk-c1b4f8c7-a7a1-4646-b21b-fcd61160613b'
  }
};
// Sequential Thinking MCP for structured reasoning
mcpServers['sequential-thinking'] = {
  command: 'npx',
  args: ['-y', '@modelcontextprotocol/server-sequential-thinking']
};
// Supabase MCP (user-configured connector)
if (process.env.SUPABASE_MCP_URL && process.env.SUPABASE_MCP_TOKEN) {
  mcpServers['supabase'] = {
    type: 'http',
    url: process.env.SUPABASE_MCP_URL,
    headers: {
      'Authorization': 'Bearer ' + process.env.SUPABASE_MCP_TOKEN
    }
  };
}

console.log(JSON.stringify({ type: 'start', timestamp: Date.now() }));

const abortController = new AbortController();
process.on('SIGTERM', () => abortController.abort());
process.on('SIGINT', () => abortController.abort());

// Build prompt - use async generator for multimodal (images), string for text-only
let promptInput;
if (imageData.length > 0) {
  const gen = async function*() {
    const contentParts = [];
    for (const img of imageData) {
      contentParts.push({
        type: 'image',
        source: { type: 'base64', media_type: img.type || 'image/png', data: img.data }
      });
    }
    contentParts.push({ type: 'text', text: fullPrompt || 'What is in this image?' });
    yield {
      type: 'user',
      message: { role: 'user', content: contentParts }
    };
  };
  promptInput = gen();
} else {
  promptInput = fullPrompt;
}

// Track if we've received streaming text deltas to avoid duplication from assistant messages
let hasStreamedText = false;

try {
  for await (const message of query({
    prompt: promptInput,
    options: {
      systemPrompt: systemPromptArg || undefined,
      abortController,
      includePartialMessages: true,
      permissionMode: 'bypassPermissions',
      allowDangerouslySkipPermissions: true,
      enableFileCheckpointing: true,
      ...(Object.keys(mcpServers).length > 0 ? {
        mcpServers,
        allowedTools: Object.keys(mcpServers).map(k => 'mcp__' + k + '__*')
      } : {})
    }
  })) {
    if (message.type === 'stream_event') {
      const event = message.event;
      if (event.type === 'content_block_delta' && event.delta?.type === 'text_delta') {
        hasStreamedText = true;
        console.log(JSON.stringify({ type: 'text', data: event.delta.text, timestamp: Date.now() }));
      } else if (event.type === 'content_block_start' && event.content_block?.type === 'tool_use') {
        console.log(JSON.stringify({ type: 'tool_use', name: event.content_block.name, input: {}, timestamp: Date.now() }));
      }
    } else if (message.type === 'assistant') {
      // IMPORTANT: Only process tool_use blocks here - text is already streamed via stream_event
      // Do NOT emit text from assistant messages to avoid duplication in multi-turn conversations
      const content = message.message?.content;
      if (Array.isArray(content)) {
        for (const block of content) {
          if (block.type === 'tool_use') {
            console.log(JSON.stringify({ type: 'tool_use', name: block.name, input: block.input, timestamp: Date.now() }));
          }
        }
      }
    } else if (message.type === 'user') {
      // User messages contain tool_result blocks
      const content = message.message?.content;
      if (Array.isArray(content)) {
        for (const block of content) {
          if (block.type === 'tool_result') {
            let resultContent = '';
            if (Array.isArray(block.content)) {
              const parts = block.content.map((c) => {
                if (c.type === 'text') return c.text;
                return '[' + c.type + ']';
              });
              resultContent = parts.join('\n');
            } else if (typeof block.content === 'string') {
              resultContent = block.content;
            } else {
              resultContent = JSON.stringify(block.content);
            }
            console.log(JSON.stringify({
              type: 'tool_result',
              tool_use_id: block.tool_use_id,
              result: (resultContent || '').substring(0, 2000),
              timestamp: Date.now()
            }));
          }
        }
      }
    } else if (message.type === 'result') {
      console.log(JSON.stringify({ type: 'result', subtype: message.subtype, result: message.result, cost: message.total_cost_usd, timestamp: Date.now() }));
    }
  }
  console.log(JSON.stringify({ type: 'complete', timestamp: Date.now() }));
  process.exit(0);
} catch (error) {
  console.error(JSON.stringify({ type: 'error', message: error.message || String(error), timestamp: Date.now() }));
  process.exit(1);
}

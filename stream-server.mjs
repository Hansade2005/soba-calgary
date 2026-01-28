#!/usr/bin/env node
import express from 'express';
import cors from 'cors';
import { query } from '@anthropic-ai/claude-agent-sdk';
import { readFileSync, writeFileSync, existsSync } from 'fs';

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const HISTORY_FILE = '/home/user/.claude_history.json';
const WORK_DIR = '/home/user/soba-calgary';
const WORKING_BRANCH = 'pipilot/please-update-this-current-rl18';

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

// Main streaming endpoint
app.post('/stream', async (req, res) => {
  const { prompt, images = [], systemPrompt: customSystemPrompt } = req.body;

  if (!prompt && images.length === 0) {
    return res.status(400).json({ error: 'prompt or images required' });
  }

  // Set up SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const send = (payload) => {
    res.write('data: ' + JSON.stringify(payload) + '\n\n');
  };

  try {
    send({ type: 'start', timestamp: Date.now() });
    send({ type: 'log', message: 'Claude is thinking...' });

    // Build conversation history
    let conversationHistory = [];
    try {
      if (existsSync(HISTORY_FILE)) {
        conversationHistory = JSON.parse(readFileSync(HISTORY_FILE, 'utf-8'));
      }
    } catch (e) {}

    // Add user message to history
    conversationHistory.push({ role: 'user', content: prompt, timestamp: new Date().toISOString() });

    const MAX_PAIRS = 6;
    const MAX_MSG_LENGTH = 800;
    const recentHistory = conversationHistory.slice(-(MAX_PAIRS * 2));

    let fullPrompt = prompt;
    if (recentHistory.length > 2) {
      const context = recentHistory.slice(0, -1)
        .map(msg => {
          const content = msg.content.length > MAX_MSG_LENGTH
            ? msg.content.slice(0, MAX_MSG_LENGTH) + '...[truncated]'
            : msg.content;
          return (msg.role === 'user' ? 'Human' : 'Assistant') + ': ' + content;
        })
        .join('\n\n');
      fullPrompt = 'Previous conversation:\n' + context + '\n\nCurrent request: ' + prompt;
    }

    // Git workflow system prompt with working directory
    const gitWorkflowPrompt = customSystemPrompt || `
IMPORTANT WORKING DIRECTORY:
- Your working directory is: ${WORK_DIR}
- ALWAYS cd to ${WORK_DIR} before running any commands
- All project files are located in ${WORK_DIR}

IMPORTANT GIT WORKFLOW INSTRUCTIONS:
- You are working on branch: ${WORKING_BRANCH}
- BEFORE committing, ALWAYS configure git user: git config user.name "pipilot-swe-bot" && git config user.email "hello@pipilot.dev"
- After making code changes, ALWAYS commit them with a clear message
- After committing, push to the remote: git push -u origin ${WORKING_BRANCH}
`.trim();

    // Configure MCP servers
    const mcpServers = {};
    if (process.env.MCP_GATEWAY_URL) {
      mcpServers['tavily'] = { type: 'http', url: process.env.MCP_GATEWAY_URL };
    }
    if (process.env.GITHUB_TOKEN) {
      mcpServers['github'] = {
        type: 'http',
        url: 'https://api.githubcopilot.com/mcp',
        headers: { 'Authorization': 'Bearer ' + process.env.GITHUB_TOKEN }
      };
    }
    mcpServers['playwright'] = { command: 'npx', args: ['@playwright/mcp@latest'] };

    // Build prompt input
    let promptInput;
    if (images.length > 0) {
      const gen = async function*() {
        const contentParts = [];
        for (const img of images) {
          contentParts.push({
            type: 'image',
            source: { type: 'base64', media_type: img.type || 'image/png', data: img.data }
          });
        }
        contentParts.push({ type: 'text', text: fullPrompt });
        yield { type: 'user', message: { role: 'user', content: contentParts } };
      };
      promptInput = gen();
    } else {
      promptInput = fullPrompt;
    }

    let textContent = '';
    let hasStreamedText = false;

    // Start heartbeat
    const heartbeat = setInterval(() => {
      send({ type: 'heartbeat', timestamp: Date.now() });
    }, 15000);

    try {
      for await (const message of query({
        prompt: promptInput,
        options: {
          systemPrompt: gitWorkflowPrompt,
          includePartialMessages: true,
          permissionMode: 'bypassPermissions',
          allowDangerouslySkipPermissions: true,
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
            textContent += event.delta.text;
            send({ type: 'text', data: event.delta.text, timestamp: Date.now() });
          } else if (event.type === 'content_block_start' && event.content_block?.type === 'tool_use') {
            send({ type: 'tool_use', name: event.content_block.name, input: {}, timestamp: Date.now() });
          }
        } else if (message.type === 'assistant') {
          // Only process tool_use blocks here - text already streamed via stream_event
          const content = message.message?.content;
          if (Array.isArray(content)) {
            for (const block of content) {
              if (block.type === 'tool_use') {
                send({ type: 'tool_use', name: block.name, input: block.input, timestamp: Date.now() });
              }
            }
          }
          // Reset for next turn (multi-turn conversations)
          hasStreamedText = false;
        } else if (message.type === 'user') {
          const content = message.message?.content;
          if (Array.isArray(content)) {
            for (const block of content) {
              if (block.type === 'tool_result') {
                let resultContent = '';
                if (Array.isArray(block.content)) {
                  resultContent = block.content.map(c => c.type === 'text' ? c.text : '[' + c.type + ']').join('\n');
                } else {
                  resultContent = String(block.content);
                }
                send({ type: 'tool_result', result: resultContent.substring(0, 2000), timestamp: Date.now() });
              }
            }
          }
        } else if (message.type === 'result') {
          send({ type: 'result', subtype: message.subtype, result: message.result, cost: message.total_cost_usd, timestamp: Date.now() });
        }
      }

      // Save to conversation history
      conversationHistory.push({ role: 'assistant', content: textContent, timestamp: new Date().toISOString() });
      try {
        writeFileSync(HISTORY_FILE, JSON.stringify(conversationHistory, null, 2));
      } catch (e) {}

      // Get git diff stats
      let diffStats = { additions: 0, deletions: 0, filesChanged: 0 };
      try {
        const { execSync } = await import('child_process');
        const diffOutput = execSync('git diff --shortstat HEAD~1 2>/dev/null || echo "0 0 0"', { cwd: WORK_DIR, encoding: 'utf-8' });
        const match = diffOutput.match(/(\d+) files? changed(?:, (\d+) insertions?\(\+\))?(?:, (\d+) deletions?\(-\))?/);
        if (match) {
          diffStats = {
            filesChanged: parseInt(match[1]) || 0,
            additions: parseInt(match[2]) || 0,
            deletions: parseInt(match[3]) || 0
          };
        }
      } catch (e) {}

      send({ type: 'complete', diff: diffStats, timestamp: Date.now() });
    } finally {
      clearInterval(heartbeat);
    }

    res.end();
  } catch (error) {
    send({ type: 'error', message: error.message || String(error), timestamp: Date.now() });
    res.end();
  }
});

const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(JSON.stringify({ type: 'server_ready', port: PORT, timestamp: Date.now() }));
});

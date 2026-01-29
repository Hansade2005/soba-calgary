# SOBAN Calgary Website

The official website for SOBAN Calgary (Sasse Old Boys Association Network - Calgary), a community-based, non-governmental, non-profit organization committed to improving the social, economic, and overall well-being of individuals and families in Calgary.

## Features

- **Membership Registration**: Secure online membership registration with Stripe payment integration
- **Donation System**: Secure donation forms with multiple payment options
- **Event Management**: Events calendar and registration
- **News & Gallery**: Content management for news and photo galleries
- **Mobile Responsive**: Fully responsive design for all devices
- **Accessibility**: WCAG 2.1 AA compliant
- **SEO Optimized**: Proper meta tags and schema markup

## Tech Stack

- **Framework**: React with Vite (React + TypeScript)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: React Icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm package manager
- Neon database account
- Stripe account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd soba-calgary-website
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="your_neon_database_url_here"

# Stripe
STRIPE_SECRET_KEY="your_stripe_secret_key_here"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key_here"
STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret_here"

# App
NEXT_PUBLIC_APP_URL="https://www.sobacalgary.org"
```

4. Generate and run database migrations:
```bash
pnpm db:generate
pnpm db:migrate
```

5. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## Database Schema

The application uses the following main tables:

- **members**: Member registration and payment information
- **donations**: Donation records and payment tracking
- **events**: Community events and activities
- **news**: News articles and announcements
- **store_items**: SOBA Calgary merchandise

## Stripe Integration

### Membership Payments
- One-time $100 CAD registration fee
- Automatic member record creation and payment tracking
- Email confirmation and receipt generation

### Donations
- Multiple donation categories (Sports & Recreation, Volunteer Programs, etc.)
- Flexible amount selection with predefined options
- Optional donor information for recognition

### Webhook Configuration
Set up a Stripe webhook endpoint at `/api/webhooks/stripe` to handle:
- `checkout.session.completed`: Update payment status
- `checkout.session.expired`: Handle failed payments

## Deployment

### Environment Setup
1. Set up a Neon database and obtain the connection URL
2. Configure Stripe keys for production
3. Set the correct `NEXT_PUBLIC_APP_URL` for your domain

### Build and Deploy
```bash
pnpm build
pnpm start
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── (site)/            # Main site pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── About/            # About section
│   ├── Donations/        # Donation forms and pages
│   ├── Features/         # Features showcase
│   ├── Header/           # Navigation header
│   ├── Hero/             # Hero section
│   ├── Membership/       # Membership forms
│   └── ...               # Other components
├── lib/                  # Utility libraries
│   ├── db/              # Database configuration and schema
│   └── stripe.ts        # Stripe configuration
├── public/              # Static assets
└── types/               # TypeScript type definitions
```

## SOBAN Calgary Information

### Mission
To strengthen communities by supporting individuals, families, and youth through poverty reduction initiatives, education, mentorship, skills development, and community engagement programs.

### Core Community Focus Areas
1. Poverty Alleviation & Economic Support
2. Youth Development & Leadership
3. Skills Development & Capacity Building
4. Newcomer & Family Support
5. Mental Wellbeing & Social Inclusion
6. Education & Lifelong Learning
7. Community Outreach & Civic Engagement
8. Cultural Preservation & Community Connection

### Leadership Team
- **President**: Ngwesse Ewane
- **Secretary**: Obi Elvis
- **Financial Secretary**: Ekane Ngulle
- **Public Relations Officer**: Ateba Macossendi

### Contact Information
- **Address**: Calgary, AB
- **Website**: www.sobacalgary.org

## Contributing

This website is maintained by SOBA Calgary. For contributions or issues, please contact the organization directly.

## License

© 2025 SOBA Calgary. All rights reserved.

# Admin UI - Next.js Management Dashboard

A modern, responsive admin dashboard built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern UI with shadcn/ui components
- 🔐 Authentication system
- 📊 Dashboard with statistics
- 🔄 Full CRUD operations for all entities
- 📱 Responsive design
- 🎯 Type-safe API services
- 🚀 Server-side rendering with Next.js App Router

## Entities Managed

- **Finance** - Financial records and transactions
- **Members** - Team members management
- **Positions** - Team positions and roles
- **Competitors** - IT Day competitors
- **Sports** - Sports activities
- **Activities** - Seminars and workshops
- **Caawiye** - Support requests
- **Candidates** - Candidate applications
- **Users** - System users

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:7005/api
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
admin-ui/
├── app/                    # Next.js app directory
│   ├── dashboard/          # Dashboard page
│   ├── finance/            # Finance pages
│   ├── members/            # Members pages
│   ├── positions/          # Positions pages
│   ├── competitors/        # Competitors pages
│   ├── sports/             # Sports pages
│   ├── activities/         # Activities pages
│   ├── caawiye/            # Caawiye pages
│   ├── candidates/         # Candidates pages
│   ├── users/              # Users pages
│   └── login/              # Login page
├── components/             # React components
│   ├── ui/                 # shadcn/ui components
│   └── layout/             # Layout components
├── services/               # API service layer
├── lib/                    # Utility functions
└── public/                 # Static assets
```

## API Services

All API calls are handled through service files in the `services/` directory:
- `user.service.ts` - User authentication and management
- `finance.service.ts` - Finance operations
- `member.service.ts` - Member operations
- `position.service.ts` - Position operations
- `competitor.service.ts` - Competitor operations
- `sport.service.ts` - Sport operations
- `activity.service.ts` - Activity operations
- `caawiye.service.ts` - Caawiye operations
- `candidate.service.ts` - Candidate operations

## Authentication

The app uses token-based authentication. Tokens are stored in localStorage and automatically included in API requests.

## Building for Production

```bash
npm run build
npm start
```

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icons

## License

MIT

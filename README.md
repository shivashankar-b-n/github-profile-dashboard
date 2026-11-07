# github-profile-dashboard

A premium, dark-themed personal GitHub profile dashboard inspired by the provided reference design.

## Features
- Real public GitHub profile and repository data from the GitHub REST API
- Responsive 3-column repository grid on desktop, single-column on mobile
- Functional sorting: Name, Most Stars, Recently Updated
- Load More pagination
- Loading and error states
- Dark premium UI matching the reference screenshot
- SEO metadata and accessible markup

## Tech stack
- Next.js
- React
- TypeScript
- Tailwind CSS
- GitHub REST API
- Lucide icons

## Local setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the environment example file:
   ```bash
   cp .env.example .env.local
   ```
3. Add optional GitHub token if needed:
   ```bash
   GITHUB_TOKEN=your_personal_access_token
   ```
4. Run the app:
   ```bash
   npm run dev
   ```
5. Open http://localhost:3000

## Deployment
Use any Next.js hosting provider such as Vercel:

```bash
npm run build
npm run start
```

Then deploy to Vercel or similar and add the same environment variables in the project settings.

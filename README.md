# Signup Website Template

A minimal, dark-themed Next.js sign-up template with Supabase integration, ready for one-click deployment on Vercel.

## Features

- 🎨 Dark theme with modern UI
- 📧 Email validation and duplicate handling
- 🚀 Ready for Vercel deployment
- 🔧 Configurable site content via `config.ts`
- 📱 Responsive design
- ⚡ Fast and lightweight

## Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd signup-website
npm install
```

### 2. Environment Setup

Copy the example environment file and configure your Supabase credentials:

```bash
cp env.example .env.local
```

Edit `.env.local` with your Supabase project details:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

**Note**: The development server will show an error page until you configure the environment variables. This is expected behavior.

### 3. Database Setup

Run the Supabase migration to create the signups table:

```bash
# Install Supabase CLI if you haven't already
npm install -g supabase

# Link your project (if not already linked)
supabase link --project-ref your-project-ref

# Run the migration
supabase db push
```

### 4. Customize Content

Edit `config.ts` to customize your site:

```typescript
export const SITE_TITLE = "Your Project Title";
export const SITE_DESCRIPTION = "Your project description";
export const PROJECT_TAG = "your-project-tag";
```

### 5. Run Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your signup page.

## Deployment

### Deploy to Vercel

1. **Push to GitHub**: Commit and push your code to a GitHub repository.

2. **Connect to Vercel**:

   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect it's a Next.js project

3. **Configure Environment Variables**:

   - In your Vercel project settings, add the environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. **Deploy**: Click "Deploy" and your site will be live!

### Manual Deployment

If you prefer manual deployment:

```bash
npm run build
npm start
```

## Project Structure

```
signup-website/
├── app/                    # Next.js 13+ app directory
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/
│   └── SignupForm.tsx     # Signup form component
├── lib/
│   └── supabase.ts        # Supabase client
├── supabase/
│   └── migrations/        # Database migrations
├── config.ts              # Site configuration
├── tailwind.config.js     # Tailwind configuration
└── package.json
```

## Customization

### Styling

The project uses Tailwind CSS with a custom dark theme. Colors are defined in `tailwind.config.js`:

- `background`: Deep gray background
- `surface`: Card/input backgrounds
- `primary`: Accent color for buttons
- `text`: Main text color
- `text-muted`: Secondary text color

### Adding Features

- **Additional fields**: Modify the `signups` table migration and update the form
- **Email notifications**: Add Supabase Edge Functions for email sending
- **Analytics**: Integrate with Google Analytics or other tracking tools
- **Custom domains**: Configure in Vercel project settings

## Troubleshooting

### Common Issues

1. **"Cannot find module" errors**: Run `npm install` to install dependencies
2. **Database connection errors**: Verify your Supabase credentials in `.env.local`
3. **Build failures**: Ensure all environment variables are set in Vercel
4. **Development server shows error page**: This is normal until you configure `.env.local`

### Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Settings > API
3. Run the migration to create the signups table

## License

MIT License - feel free to use this template for your projects!

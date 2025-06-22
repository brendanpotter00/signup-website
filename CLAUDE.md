# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a multi-project signup website template built with Next.js 14, Supabase, and Tailwind CSS. It supports multiple project landing pages with individual signup forms, all managed through configuration files.

## Common Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
supabase db push     # Apply migrations to database
supabase link        # Link to Supabase project
```

## Architecture

### Multi-Project System
- Root redirects to default project (`/` → `/projects/rankr`)
- Dynamic routes handle individual projects at `/projects/[slug]`
- Project metadata defined in `projectConfig.ts`
- Site-wide defaults in `config.ts`

### Key Files
- `projectConfig.ts` - Defines available projects and their metadata
- `config.ts` - Global site configuration and Google Analytics setup
- `app/projects/[slug]/page.tsx` - Dynamic project page routing
- `app/projects/[slug]/ProjectPageClient.tsx` - Client-side project page component
- `components/SignupForm.tsx` - Reusable signup form with analytics tracking
- `lib/supabase.ts` - Supabase client configuration

### Database Schema
Single `signups` table with:
- `email` (TEXT PRIMARY KEY)
- `tag` (TEXT NOT NULL) - identifies which project the signup is for

## Environment Variables Required

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX  # Optional, for Google Analytics
```

## Adding New Projects

1. Add project metadata to `PROJECT_META` in `projectConfig.ts`
2. Optionally update `DEFAULT_PROJECT` if needed
3. Project will be automatically available at `/projects/[new-project-slug]`

## Google Analytics Integration

- Automatic event tracking for signup attempts, successes, and errors
- Events include `project_tag` parameter for multi-project analytics
- Component: `components/GoogleAnalytics.tsx`
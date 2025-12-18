# Vercel Deployment Guide

## Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/bsabio/IS373_final)

## Manual Setup

1. **Go to Vercel Dashboard:**
   - Visit https://vercel.com
   - Login with GitHub

2. **Import Project:**
   - Click "Add New..." → "Project"
   - Select `IS373_final` repository
   - Click "Import"

3. **Configure Build Settings:**
   - Framework: Other
   - Build Command: `npm run build`
   - Output Directory: `_site`
   - Install Command: `npm install`

4. **Add Environment Variables:**

Required variables:
```
ELEVENTY_ENV=production
SANITY_PROJECT_ID=i0o27d0x
SANITY_DATASET=production
SANITY_TOKEN=your_read_token
SANITY_WRITE_TOKEN=your_write_token
DISCORD_WEBHOOK_URL=your_discord_webhook
AIRTABLE_API_KEY=your_airtable_key
AIRTABLE_BASE_ID=your_base_id
AIRTABLE_TABLE_NAME=Submissions
```

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site will be live at `your-project.vercel.app`

## Features Enabled on Vercel

✅ **Static Site:** All pages (HTML/CSS/JS)
✅ **API Routes:** `/api/submit`, `/api/styles`, `/api/reviews`, etc.
✅ **Serverless Functions:** Automatic from `api/` folder
✅ **Integrations:** Sanity CMS, Discord, Airtable all work
✅ **Auto-Deploy:** Every push to GitHub triggers deployment
✅ **Custom Domain:** Can add your own domain

## API Endpoints

Once deployed, these will work:
- `POST /api/submit` - Handle submissions
- `GET /api/styles` - Get design styles
- `GET /api/reviews` - Get pending reviews
- `POST /api/approve` - Approve submission
- `POST /api/reject` - Reject submission

## Troubleshooting

**Issue:** API calls fail
- **Fix:** Add all environment variables in Vercel dashboard

**Issue:** Build fails
- **Fix:** Check build logs, ensure all dependencies in package.json

**Issue:** Serverless function timeout
- **Fix:** Optimize API code, reduce external API calls

## Notes

- Vercel automatically detects the `api/` folder as serverless functions
- Each file in `api/` becomes a route (e.g., `api/submit.js` → `/api/submit`)
- Functions run on Node.js 18.x runtime
- Cold start time: ~200ms
- Execution limit: 10 seconds (free tier)

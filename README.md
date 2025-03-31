This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Sitemap

This project includes a dynamically generated sitemap for better SEO. The sitemap is available at `/sitemap.xml`.

The sitemap is generated based on the menu structure defined in `src/lib/site/menus.ts`.

- The root page (`/`) has the highest priority (1.0) and changes daily
- Other pages have a priority of 0.8 and change weekly
- The sitemap automatically includes the current date as the last modified date
- Home page is placed first in the sitemap for better indexing

You can configure the base URL by setting the `NEXT_PUBLIC_BASE_URL` environment variable in your `.env.local` file.

## Robots.txt

This project includes a dynamically generated robots.txt file for search engine crawling control.

- Allows crawling of all main pages (home, contactus, portfolios, designs, widgets, faq)
- Excludes not-found pages and API routes from crawling
- Includes crawl-delay directive for better server performance
- Links to the sitemap.xml for efficient crawling
- Sets the host directive for canonical URL handling

## SEO Optimization

Additional SEO optimizations in this project:

- Comprehensive metadata in the root layout with OpenGraph and Twitter card support
- Korean language specification (lang="ko")
- Custom page titles and descriptions for all main pages
- Mobile-friendly responsive design
- Fast performance with Next.js App Router

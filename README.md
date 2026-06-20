# kritikarastogi.com

Kritika Rastogi's product marketing portfolio and automated editorial site. Built with Astro and deployed as static HTML.

## Local development

```bash
npm install
npm run dev
```

Production check:

```bash
npm run build
```

For the live Competitive Signal Brief tool in local development, create a `.env` file from `.env.example` and set `OPENAI_API_KEY` or `ANTHROPIC_API_KEY`. In production, add the same variable in your Vercel project settings.

## Content

Writing lives in `src/content/writing`. Every Markdown file becomes a page and automatically appears in the writing archive.

Case studies live in `src/data/caseStudies.ts`. Reconstructed artifacts are labeled as such on the page.

## Editorial drafting

The scheduled GitHub Action runs weekly at 8:15 a.m. Pacific during daylight saving time. It:

1. Reads recent items from a small set of technology and product feeds.
2. Gives one model call a source packet and strict editorial brief.
3. Rejects short, long, uncited, malformed, or cliché-heavy drafts.
4. Writes a private Markdown draft using the Pacific publication date and validates the build.
5. Stores the hidden draft in the private repository for human editing and approval. Drafts stay off the public site until `draft: false` is set.

Add either `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` in GitHub repository **Settings → Secrets and variables → Actions**. Model names can be overridden with the `ANTHROPIC_MODEL` or `OPENAI_MODEL` repository variable.

The recommended OpenAI configuration is `OPENAI_MODEL=gpt-5.4-mini`, which offers a strong quality-to-cost balance for short sourced articles.

An interactive Codex subscription cannot power unattended GitHub Actions by itself; a metered API key is required for automated drafting. The workflow uses one call per week, making it inexpensive with a small model.

Test research without calling a model:

```bash
npm run generate:daily:dry
```

## Recommended deployment

1. Push this repository to GitHub.
2. Import it into Vercel with framework preset **Astro**.
3. Add `kritikarastogi.com` and `www.kritikarastogi.com` in Vercel.
4. In Squarespace Domains, replace the current DNS records with the records Vercel provides.
5. Add the model API secret to GitHub to activate weekly drafting.

Vercel will build every push, including articles committed by the publishing workflow.

Enable Web Analytics in the Vercel project dashboard after the first deployment. The site includes Vercel's privacy-friendly analytics component for page and referrer reporting without cookies.

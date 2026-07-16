---
name: deploy
description: Run the test suite, build the production bundle, and push a staging deployment to Vercel. Use when the user asks to "deploy", "ship to staging", or "push a staging build".
---

# Deploy

Deploys this app to a Vercel **staging** deployment (preview URL, not production).

## Steps

Run these in order. Stop and report if any step fails — do not proceed to the next
step or force through a failure.

1. **Tests**

   ```bash
   npm test
   ```

   If this fails because no test script exists yet, tell the user a test script
   needs to be added to `package.json` and stop — do not skip ahead to build/deploy.

2. **Build**

   ```bash
   npm run build
   ```

   This produces the production bundle in `dist/`. Confirm it exits cleanly before
   continuing.

3. **Push to staging (Vercel)**

   ```bash
   npx vercel deploy --yes
   ```

   Do **not** pass `--prod` — this must stay a preview/staging deployment. On the
   first run in this repo, the Vercel CLI may prompt to link the project (org/project
   selection); if it needs interactive input, hand that prompt to the user rather
   than guessing values.

   Report back the preview URL the CLI prints.

## Notes

- This is a staging push, not a production release — never add `--prod` to the
  vercel command as part of this skill.
- If `vercel` isn't authenticated (`npx vercel whoami` fails), tell the user to run
  `npx vercel login` themselves rather than attempting it non-interactively.

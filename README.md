# paulhartmann.dev

This is my personal site and small product studio home. It is intentionally simple: plain HTML, shared CSS tokens, a little JavaScript, and Vercel functions where the site needs server behavior.

The site is a place to show work, explain what I build, and give people a clear way to contact me.

Live site: [paulhartmann.dev](https://paulhartmann.dev)

## Routes

- `/` for the home page
- `/work` and `/work/*` for the portfolio and case studies
- `/about`, `/pricing`, and `/contact` for studio information
- `/login` for GitHub and Google OAuth entry
- `/privacy-policy` and `/terms-of-service` for legal pages

## Run it locally

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and add only the services you want to test. Do not commit secret values.

## Production notes

Stripe Checkout needs either `STRIPE_SECRET_KEY` or the `STRIPE_PAYMENT_LINK_*` values. OAuth needs `AUTH_SECRET` plus the client ID and secret for each provider.

Use these production callbacks:

- `https://paulhartmann.dev/api/auth/github`
- `https://paulhartmann.dev/api/auth/google`

Contact delivery uses `EMAIL_USER` and `EMAIL_PASSWORD`. The remaining email variables have defaults or are optional.

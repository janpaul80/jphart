# paulhartmann.dev

Multi-page portfolio and product studio site for Paul Hartmann. The experience is intentionally framework-free: semantic HTML, a shared token-based CSS system, small vanilla JavaScript interactions, and Vercel serverless functions.

## Routes

- `/` — cinematic home with a lightweight Three.js identity object
- `/work` and `/work/*` — portfolio archive and case studies
- `/about`, `/pricing`, `/contact` — studio information and conversion paths
- `/login` — GitHub and Google OAuth entry point
- `/privacy-policy`, `/terms-of-service` — legal pages

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and add only the services you intend to test. Never commit secret values.

## Production configuration

Stripe Checkout needs either `STRIPE_SECRET_KEY` or the three `STRIPE_PAYMENT_LINK_*` values. OAuth needs `AUTH_SECRET` plus the client ID and secret for each provider. Register these exact production callbacks:

- `https://paulhartmann.dev/api/auth/github`
- `https://paulhartmann.dev/api/auth/google`

Contact delivery uses `EMAIL_USER` and `EMAIL_PASSWORD`; the remaining email variables have safe defaults or are optional.

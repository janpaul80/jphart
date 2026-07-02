const plans = {
  starter: { name: 'Starter — Focused launch', amount: 14900, linkEnv: 'STRIPE_PAYMENT_LINK_STARTER' },
  builder: { name: 'Builder — Working product', amount: 29900, linkEnv: 'STRIPE_PAYMENT_LINK_BUILDER' },
  scale: { name: 'Scale — System foundation', amount: 49900, linkEnv: 'STRIPE_PAYMENT_LINK_SCALE' }
};

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });
  const plan = plans[String(req.body?.plan || '').toLowerCase()];
  if (!plan) return res.status(400).json({ error: 'Choose a valid package.' });

  const paymentLink = process.env[plan.linkEnv];
  if (paymentLink) return res.status(200).json({ url: paymentLink });
  if (!process.env.STRIPE_SECRET_KEY) return res.status(503).json({ error: 'Secure checkout is being configured. Please email contact@paulhartmann.dev.' });

  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'paulhartmann.dev';
  const origin = `${protocol}://${host}`;
  const params = new URLSearchParams();
  params.set('mode', 'payment');
  params.set('success_url', `${origin}/contact?checkout=success`);
  params.set('cancel_url', `${origin}/pricing?checkout=cancelled`);
  params.set('line_items[0][quantity]', '1');
  params.set('line_items[0][price_data][currency]', 'usd');
  params.set('line_items[0][price_data][unit_amount]', String(plan.amount));
  params.set('line_items[0][price_data][product_data][name]', plan.name);
  params.set('billing_address_collection', 'auto');
  params.set('customer_creation', 'always');
  params.set('allow_promotion_codes', 'true');
  params.set('metadata[plan]', String(req.body.plan).toLowerCase());

  try {
    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params
    });
    const session = await response.json();
    if (!response.ok || !session.url) {
      console.error('Stripe session failed:', session?.error?.message || response.status);
      return res.status(502).json({ error: 'Stripe checkout is temporarily unavailable.' });
    }
    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe request failed:', error?.message || error);
    return res.status(502).json({ error: 'Stripe checkout is temporarily unavailable.' });
  }
};

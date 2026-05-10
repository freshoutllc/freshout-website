const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { serviceName, totalAmount, customerName, customerEmail, propertyType, address, date, time, hours, bedrooms, bathrooms, addons } = req.body;

    if (!totalAmount || totalAmount < 100) return res.status(400).json({ error: 'Invalid amount' });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Fresh Out LLC — ${serviceName}`,
            description: `${address} | ${date} at ${time} (${hours}h) | ${propertyType}`,
          },
          unit_amount: Math.round(totalAmount * 100),
        },
        quantity: 1,
      }],
      customer_email: customerEmail || undefined,
      success_url: `https://freshoutllc.com?payment=success`,
      cancel_url: `https://freshoutllc.com?payment=cancelled`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, message, rating } = req.body;
  if (!name || !message) return res.status(400).json({ error: 'Données manquantes' });

  const stars = '★'.repeat(Math.min(5, rating || 5));
  const preview = message.length > 60 ? message.substring(0, 60) + '...' : message;

  const response = await fetch('https://onesignal.com/api/v1/notifications', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': ⁠ Basic ${process.env.ONESIGNAL_REST_API_KEY} ⁠
    },
    body: JSON.stringify({
      app_id: '08596b11-2d87-4e57-82c7-7fbf8030dfdf',
      included_segments: ['Subscribed Users'],
      headings: { fr: 'Balima Web Developer' },
      contents: { fr: ⁠ Nouvel avis de ${name} — ${stars}\n"${preview}" ⁠ }
    })
  });

  return res.status(200).json({ success: response.ok });
}

const functions = require("firebase-functions");

exports.sendReviewNotification = functions.https.onCall(async (data, context) => {
  const { name, message, rating } = data;

  if (!name || !message) {
    throw new functions.https.HttpsError("invalid-argument", "Données manquantes.");
  }

  const stars = "★".repeat(Math.min(5, rating || 5));
  const preview = message.length > 60 ? message.substring(0, 60) + "..." : message;

  const response = await fetch("https://onesignal.com/api/v1/notifications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Basic os_v2_app_bbmwwejnq5hfpawhp67yamg735rqyks5g76exhn6czfl5765q5zi7wxdiuprhqsotkekab4og6gbiohgfqwjzvjhucmf6axkepmjpki"
    },
    body: JSON.stringify({
      app_id: "08596b11-2d87-4e57-82c7-7fbf8030dfdf",
      included_segments: ["Subscribed Users"],
      headings: { fr: "Balima Web Developer" },
      contents: {
        fr: ⁠ Nouvel avis de ${name} — ${stars}\n"${preview}" ⁠
      }
    })
  });

  return { success: response.ok };
});

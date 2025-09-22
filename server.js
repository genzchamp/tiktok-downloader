// inside your server.js, in app.post("/api/download", ...)
const { tiktokUrl } = req.body || {};
if (!tiktokUrl) {
  return res.status(400).json({ error: "No TikTok URL provided" });
}

try {
  const providerUrl = `https://zylalabs.com/api/3085/tiktok+video+downloader+api/3265/download+video?url=${encodeURIComponent(tiktokUrl)}`;
  const apiResp = await fetch(providerUrl, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${process.env.ZYLA_API_KEY}`
    }
  });

  if (!apiResp.ok) {
    const status = apiResp.status;
    const text = await apiResp.text();
    console.error("ZylaLabs responded with status", status, "body:", text);
    return res.status(502).json({ error: "Upstream API error", status, details: text });
  }

  const json = await apiResp.json();

  // The field name might differ depending on what ZylaLabs returns
  // Usually something like json.downloadUrl or json.video
  const downloadUrl = json.downloadUrl || json.video || json.url || json.link;

  if (!downloadUrl) {
    return res.status(502).json({ error: "ZylaLabs did not return a usable download URL", fullResponse: json });
  }

  // Send back just the link for the frontend to use
  return res.json({ downloadUrl });
} catch (err) {
  console.error("Error contacting ZylaLabs:", err);
  return res.status(500).json({ error: "Server error contacting ZylaLabs" });
}

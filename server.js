// server.js (CommonJS, works on Render / Node 18+)
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// serve static frontend from /public
app.use(express.static(path.join(__dirname, "public")));

// Simple health check
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is running 🚀" });
});

// Demo download endpoint (safe test).
// Later we'll replace the inside of this handler with real API calling code.
app.post("/api/download", async (req, res) => {
  const { tiktokUrl } = req.body || {};
  if (!tiktokUrl) {
    return res.status(400).json({ error: "No TikTok URL provided" });
  }

  // demo public MP4 so frontend flow works while we integrate a real API
  const demoLink = "https://file-examples.com/wp-content/uploads/2018/04/file_example_MP4_480_1_5MG.mp4";

  return res.json({
    downloadUrl: demoLink,
    info: "Demo download link. Replace with real API integration later."
  });
});

// fallback to index.html for SPA behaviour
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

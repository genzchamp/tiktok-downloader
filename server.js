const express = require("express");
const fetch = require("node-fetch");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/test", (req, res) => {
  res.json({ message: "Server is running 🚀" });
});

app.post("/api/download", (req, res) => {
  const { tiktokUrl } = req.body || {};
  if (!tiktokUrl) {
    return res.status(400).json({ error: "No TikTok URL provided" });
  }

  // Demo link for now
  const demoLink = "https://file-examples.com/wp-content/uploads/2018/04/file_example_MP4_480_1_5MG.mp4";
  res.json({ downloadUrl: demoLink, info: "Demo link — replace with real API later" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

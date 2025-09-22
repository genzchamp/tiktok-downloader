async function downloadVideo() {
  const url = document.getElementById("urlInput").value;
  if (!url) {
    alert("Please paste a TikTok link!");
    return;
  }

  const res = await fetch("/api/download", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tiktokUrl: url })
  });

  const data = await res.json();
  const resultDiv = document.getElementById("result");
  if (data.downloadUrl) {
    resultDiv.innerHTML = `<a href="${data.downloadUrl}" target="_blank">Download Video</a>`;
  } else {
    resultDiv.innerHTML = `<p>Error: ${data.error}</p>`;
  }
}

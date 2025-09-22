document.getElementById("downloadForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  
  const url = document.getElementById("urlInput").value;
  const resultDiv = document.getElementById("result");
  
  resultDiv.innerHTML = "Processing...";

  try {
    const resp = await fetch("/api/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tiktokUrl: url })
    });

    const data = await resp.json();

    if (data.error) {
      resultDiv.innerHTML = `<p style="color:red">Error: ${data.error}</p>`;
      return;
    }

    if (data.downloadUrl) {
      resultDiv.innerHTML = `<p>Ready — <a href="${data.downloadUrl}" target="_blank" rel="noopener">Download Video</a></p>
                             <small>${data.info || ""}</small>`;
    } else {
      resultDiv.innerHTML = "<p style='color:red'>No download link returned</p>";
    }
  } catch (err) {
    console.error(err);
    resultDiv.innerHTML = "<p style='color:red'>Server error contacting /api/download</p>";
  }
});

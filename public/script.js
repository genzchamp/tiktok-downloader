// DEBUG script.js - paste this into public/script.js and commit
(function(){
  // Helper to write messages to result area
  function write(msg, isError=false) {
    const resultDiv = document.getElementById("result");
    if (resultDiv) {
      const p = document.createElement("p");
      p.textContent = msg;
      if (isError) p.style.color = "red";
      resultDiv.appendChild(p);
    } else {
      alert("RESULT DIV NOT FOUND: " + msg);
    }
    console.log(msg);
  }

  async function doDownload(e) {
    e && e.preventDefault();
    const url = document.getElementById("urlInput")?.value || "";
    if (!url) {
      write("Please enter a TikTok URL.", true);
      alert("Please enter a TikTok URL.");
      return;
    }

    write("Starting request to /api/download...");
    alert("Starting request to /api/download...");

    try {
      const resp = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tiktokUrl: url })
      });

      write("Request sent — waiting for response...");

      const text = await resp.text(); // read raw text for debugging
      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonErr) {
        write("Response is not JSON. Raw response: " + text, true);
        console.error("Non-JSON response:", text);
        return;
      }

      if (data.error) {
        write("Server returned error: " + data.error, true);
        alert("Server error: " + data.error);
        return;
      }

      if (data.downloadUrl) {
        write("Success! Download URL: " + data.downloadUrl);
        // show clickable link
        const resultDiv = document.getElementById("result");
        const a = document.createElement("a");
        a.href = data.downloadUrl;
        a.textContent = "Download Demo Video";
        a.target = "_blank";
        resultDiv.appendChild(a);
      } else {
        write("No downloadUrl in response: " + JSON.stringify(data), true);
      }
    } catch (err) {
      write("Fetch failed: " + err.message, true);
      console.error(err);
      alert("Fetch failed: " + err.message);
    }
  }

  // Wait and bind safely
  function bind() {
    const form = document.getElementById("downloadForm");
    if (form) {
      form.addEventListener("submit", doDownload);
      write("Event listener attached to #downloadForm");
    } else {
      write("downloadForm not found yet; retrying in 500ms...", true);
      setTimeout(bind, 500);
    }
  }

  // Clear previous result area and initialize
  const resultDiv = document.getElementById("result");
  if (resultDiv) resultDiv.innerHTML = "";
  window.addEventListener("load", bind);
})();

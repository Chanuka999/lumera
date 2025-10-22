import express from "express";

const router = express.Router();

// GET /api/image-proxy?url=<encoded_url>
router.get("/", async (req, res) => {
  const { url } = req.query;
  if (!url || typeof url !== "string") {
    return res.status(400).json({ message: "Missing url query parameter" });
  }

  // Basic validation: allow only http/https
  if (!/^https?:\/\//i.test(url)) {
    return res.status(400).json({ message: "Invalid URL" });
  }

  try {
    // Use native fetch (Node 18+) to retrieve the remote image
    const response = await fetch(url, { method: "GET", redirect: "follow" });

    if (!response.ok) {
      console.error("Image proxy remote response not ok", response.status, url);
      return res.status(502).json({ message: "Failed to fetch remote image" });
    }

    // Forward status and important headers
    res.statusCode = response.status;
    const contentType = response.headers.get("content-type");
    if (contentType) res.setHeader("Content-Type", contentType);
    const cacheControl = response.headers.get("cache-control");
    if (cacheControl) res.setHeader("Cache-Control", cacheControl);

    // Stream the response body to the client
    const body = response.body;
    if (!body) return res.status(502).json({ message: "No response body" });

    for await (const chunk of body) {
      if (!res.writableEnded) res.write(chunk);
    }
    if (!res.writableEnded) res.end();
  } catch (err) {
    console.error("Image proxy error for url", url, err?.message || err);
    return res.status(502).json({ message: "Failed to fetch remote image" });
  }
});

export default router;

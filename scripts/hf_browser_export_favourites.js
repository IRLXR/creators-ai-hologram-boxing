/**
 * Run on https://higgsfield.ai while logged in (DevTools → Console).
 * Exports favorited image URLs as JSON — paste output into adds/favourites/manifest.json
 * then run: python scripts/download_hf_favourites.py --manifest adds/favourites/manifest.json
 */
(async () => {
  const API = "https://fnf.higgsfield.ai";
  const session = document.cookie.match(/__session=([^;]+)/)?.[1];
  if (!session) {
    console.error("No __session cookie — log in at higgsfield.ai first.");
    return;
  }
  const headers = { Authorization: `Bearer ${session}` };

  let items = [];
  for (const path of ["/assets/favourites", "/assets/favorites"]) {
    const resp = await fetch(`${API}${path}`, { headers, credentials: "include" });
    if (resp.ok) {
      const data = await resp.json();
      items = Array.isArray(data) ? data : data.items || data.assets || data.jobs || [];
      break;
    }
  }
  if (!items.length) {
    const resp = await fetch(`${API}/jobs/accessible?size=200`, { headers, credentials: "include" });
    const data = await resp.json();
    items = (data.jobs || []).filter((j) => j.is_favourite);
  }

  const isImage = (item) => {
    const t = (item.type || item.media_type || "").toLowerCase();
    if (t === "image") return true;
    const raw = item.results?.raw || {};
    return (raw.type || "").toLowerCase() === "image";
  };

  const images = items.filter(isImage).map((item) => ({
    id: item.id,
    url:
      item.results?.raw?.url ||
      item.results?.rawUrl ||
      item.url ||
      item.preview_url ||
      "",
    created_at: item.created_at || null,
  }));

  console.log(JSON.stringify({ count: images.length, images }, null, 2));
  copy(JSON.stringify({ count: images.length, images }, null, 2));
  console.log(`Copied ${images.length} favorited image(s) to clipboard.`);
})();

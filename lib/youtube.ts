const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;
const ALLOWED_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "youtu.be",
  "www.youtu.be",
  "youtube-nocookie.com",
  "www.youtube-nocookie.com",
]);

export function youtubeVideoId(value: string) {
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:" || !ALLOWED_HOSTS.has(url.hostname.toLowerCase())) return null;

    let id = "";
    if (url.hostname.toLowerCase().endsWith("youtu.be")) {
      id = url.pathname.split("/").filter(Boolean)[0] ?? "";
    } else if (url.pathname === "/watch") {
      id = url.searchParams.get("v") ?? "";
    } else {
      const [kind, candidate] = url.pathname.split("/").filter(Boolean);
      if (kind === "embed" || kind === "shorts" || kind === "live") id = candidate ?? "";
    }

    return VIDEO_ID.test(id) ? id : null;
  } catch {
    return null;
  }
}

export function youtubeEmbedUrl(value: string) {
  const id = youtubeVideoId(value);
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
}

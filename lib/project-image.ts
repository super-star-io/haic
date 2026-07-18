const LOCAL_PROJECT_IMAGE = /^\/projects\/[A-Za-z0-9/_-]+\.(?:avif|jpe?g|png|webp)$/i;
const REMOTE_IMAGE_PATH = /\.(?:avif|jpe?g|png|webp)$/i;

export function normalizeProjectImage(value: string) {
  const candidate = value.trim();
  if (LOCAL_PROJECT_IMAGE.test(candidate)) return candidate;

  try {
    const url = new URL(candidate);
    if (url.protocol !== "https:" || !REMOTE_IMAGE_PATH.test(url.pathname)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

/**
 * Ensures that image URLs (especially Cloudinary) use HTTPS
 * to prevent mixed content blocking in standalone PWAs and modern browsers.
 */
export const ensureHttps = (url, fallback = "/favicon.png") => {
    if (!url || typeof url !== "string") {
        return fallback;
    }

    const trimmed = url.trim();
    if (!trimmed) {
        return fallback;
    }

    // Upgrade http:// to https://
    if (trimmed.startsWith("http://")) {
        return trimmed.replace(/^http:\/\//i, "https://");
    }

    return trimmed;
};

export default ensureHttps;

export function readPreference(key, fallback) {
    try {
        return localStorage.getItem(key) ?? fallback;
    }
    catch {
        return fallback;
    }
}
export function savePreference(key, value) {
    try {
        localStorage.setItem(key, value);
    }
    catch {
        // Controls still work in this document when storage is blocked.
        document.documentElement.dataset.storage = "unavailable";
    }
}

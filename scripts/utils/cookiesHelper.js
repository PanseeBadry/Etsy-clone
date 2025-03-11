// Function to set a cookie (no expiry date)
function setCookie(key, value) {
    document.cookie = `${key}=${JSON.stringify(value)}; path=/`; // Store as JSON
}

// Function to get a cookie by key
function getCookie(key) {
    const cookies = document.cookie.split("; ");

    for (let cookie of cookies) {
        let [cookieKey, cookieValue] = cookie.split("=");

        if (cookieKey === key) {
            try {
                return JSON.parse(cookieValue);
            } catch {
                return null;
            }
        }
    }
    return null;
}

// Function to delete a specific cookie
function deleteCookie(key) {
    document.cookie = `${key}=; expires=${new Date(0).toUTCString()}; path=/`;
}

// Function to clear all cookies
function clearCookies() {
    document.cookie.split("; ").forEach(cookie => {
        let cookieKey = cookie.split("=")[0];
        document.cookie = `${cookieKey}=; expires=${new Date(0).toUTCString()}; path=/`;
    });
}

// Exporting functions
export { setCookie, getCookie, deleteCookie, clearCookies };
import { setCookie, getCookie, deleteCookie, clearCookies } from "/scripts/utils/cookiesHelper.js";

// Function to check if localStorage is available in the browser
const isLocalStorageAvailable = (() => {
    try {
        const testKey = "__test__";
        window.localStorage.setItem(testKey, "1");
        window.localStorage.removeItem(testKey);
        return true;
    } catch (e) {
        return false;
    }
})();

// Use localStorage if available, otherwise use cookies as fallback
const LS = isLocalStorageAvailable
    ? {
        setItem: (key, value) => window.localStorage.setItem(key, JSON.stringify(value)),
        getItem: (key) => {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        },
        removeItem: (key) => window.localStorage.removeItem(key),
        clear: () => window.localStorage.clear(),
    }
    : {
        setItem: setCookie,
        getItem: getCookie,
        removeItem: deleteCookie,
        clear: clearCookies,
    };

export default LS;

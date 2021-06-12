const parseToURL = (file) => {
    if (window.webkitURL) {
        return window.webkitURL.createObjectURL(file); // Fallback to older Browser
    }
    if (window.URL && window.URL.createObjectURL) {
        return window.URL.createObjectURL(file);
    }
    return null;
};
export default parseToURL;

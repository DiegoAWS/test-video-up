export const parseToURL = (file) => {
  if (window.webkitURL) {
    return window.webkitURL.createObjectURL(file); // Fallback to older Browser
  } else if (window.URL && window.URL.createObjectURL) {
    return window.URL.createObjectURL(file);
  } else {
    return null;
  }
};

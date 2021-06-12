/**
 * is File
 * @param {File} file
 * @returns
 */
export const isFile = (file) => file && file.size; // And a size

export const isFileValid = (file) =>
    isFile(file) &&
    file.size < 50000000 && // File limit of 50mb
    file.name.includes('.');

const isFirstFileValid = (files) =>
    files &&
    Array.isArray(files) &&
    files.length > 0 && // Not empty Array
    files[0] && // File [0] exist
    isFileValid(files[0]); // and is valid

export default isFirstFileValid;

/**
 * is File
 * @param {File} file
 * @returns
 */
export const isFile = (file) =>
  file &&
  file.name && // File should have a name
  file.size; // And a size

export const isFileValid = (file) =>
  isFile(file) &&
  file.size < 50000000 && // File limit of 50mb
  file.name.include(".");

export const isFirstFileValid = (files) =>
  files &&
  Array.isArray(files) &&
  files[0] && // File [0] exist
  isFileValid(files[0]); // and is valid

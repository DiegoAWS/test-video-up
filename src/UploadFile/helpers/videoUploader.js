import axios from "axios";

export const videoUploader = ({ urlUpload, videoFile, onUploadProgress }) => {
  const fileName = videoFile.name || "recorded_" + new Date().toISOString();

  const formData = new FormData();

  formData.append("file", videoFile);
  formData.append("fileName", fileName);

  return axios.post(urlUpload, formData, { onUploadProgress });
};

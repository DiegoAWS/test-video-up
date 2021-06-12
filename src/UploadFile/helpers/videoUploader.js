import axios from 'axios';

const { CancelToken } = axios;
let cancelAxios;
const videoUploader = ({ urlUpload, videoFile, onUploadProgress }) => {
    const fileName = videoFile.name || `recorded_${new Date().toISOString()}`;

    const formData = new FormData();

    formData.append('file', videoFile);
    formData.append('fileName', fileName);

    return axios.post(urlUpload, formData, {
        onUploadProgress,
        cancelToken: new CancelToken(function executor(cancel) {
            // An executor function receives a cancel function as a parameter
            cancelAxios = cancel;
        }),
    });
};

export default videoUploader;

export const cancelAxiosRequest = (message) => {
    cancelAxios(message);
};

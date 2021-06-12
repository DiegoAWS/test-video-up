import React, { useState } from "react";
import {
  WelcomeFileUpload,
  VideoPlayer,
  VideoRecorderComponent,
} from "./components/";
import { parseToURL } from "./helpers";
import { videoUploader } from "./helpers/videoUploader";
import { state } from "./struct";

export default function UploadFile({ urlUpload }) {
  //State
  const [videoLoadedAsUrl, setVideoLoadedAsUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [status, setStatus] = useState(state.INIT);
  const [videoFile, setVideoFile] = useState(null);

  /**
   * Every time there is a new valid file arriving
   * @param {File} file
   */
  const onChangeFileHandler = (file) => {
    setVideoFile(file);

    const fileUrl = parseToURL(file);
    if (fileUrl) {
      setStatus(state.LOADED);
      setVideoLoadedAsUrl(fileUrl);
    }
  };

  /**
   * Keep Update the progress of File Upload
   * @param {Progress} progressEvent
   */
  const onUploadProgress = (progressEvent) => {
    let percentCompleted = Math.floor(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setUploadProgress(percentCompleted);
  };

  /**
   * Show VideoRecorder
   */
  const onClickRecordVideo = () => {
    setStatus(state.RECORDING);
  };

  /**
   * Upload File Module
   * internally use teh videoUploader helper Function
   */
  const uploadVideoHandler = async () => {
    setStatus(state.UPLOADING);

    try {
      const resposeFromFileUp = await videoUploader({
        urlUpload,
        videoFile,
        onUploadProgress,
      });

      console.log({ resposeFromFileUp }); // Handle Success
      setStatus(state.UPLOADED);
    } catch (ex) {
      setStatus(state.ERROR_UPLOADING);
      console.log(ex); // Handle Failed
    }

    setTimeout(() => {
      setStatus(status === state.UPLOADED ? state.COMPLETED : state.LOADED);
    }, 2000);
  };

  const resetStatus = () => {
    setStatus(state.INIT);
    setVideoLoadedAsUrl(null);
    setVideoFile(null);
    setUploadProgress(0);
  };

  return (
    <div>
      {status === state.INIT ? (
        <WelcomeFileUpload
          onChange={onChangeFileHandler}
          onClickRecordVideo={onClickRecordVideo}
        />
      ) : status === state.RECORDING ? (
        <VideoRecorderComponent
          cancel={resetStatus}
          onChange={onChangeFileHandler}
        />
      ) : (
        <VideoPlayer
          urlVideo={videoLoadedAsUrl}
          uploadProgress={uploadProgress}
          status={status}
          cancel={resetStatus}
          uploadVideo={uploadVideoHandler}
        />
      )}
    </div>
  );
}

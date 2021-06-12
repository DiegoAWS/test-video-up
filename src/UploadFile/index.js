/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { WelcomeFileUpload, VideoPlayer, VideoRecorderComponent } from './components';
import { parseToURL, videoUploader } from './helpers';
import { state, CANCELLED_BY_USER } from './helpers/constants';

export default function UploadFile({ urlUpload, onChange }) {
    // State
    const [videoLoadedAsUrl, setVideoLoadedAsUrl] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [status, setStatus] = useState(state.INIT);
    const [videoFile, setVideoFile] = useState(null);

    const resetStatus = () => {
        setStatus(state.INIT);
        setVideoLoadedAsUrl(null);
        setVideoFile(null);
        setUploadProgress(0);
    };

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
        const percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
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

            onChange({ resposeFromFileUp }); // Handle Success
            setStatus(state.UPLOADED);

            setTimeout(() => {
                setStatus(state.COMPLETED);
            }, 2000);
        } catch (err) {
            if (err.message === CANCELLED_BY_USER) {
                resetStatus();
            } else {
                setStatus(state.ERROR_UPLOADING);

                setTimeout(() => {
                    resetStatus();
                }, 2000);
            }
        }
    };

    return (
        <div>
            {status === state.INIT ? (
                <WelcomeFileUpload
                    onChange={onChangeFileHandler}
                    onClickRecordVideo={onClickRecordVideo}
                />
            ) : status === state.RECORDING ? (
                <VideoRecorderComponent cancel={resetStatus} onChange={onChangeFileHandler} />
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
UploadFile.propTypes = {
    urlUpload: PropTypes.string,
    onChange: PropTypes.func,
};

UploadFile.defaultProps = {
    urlUpload: '',
    onChange: () => {},
};

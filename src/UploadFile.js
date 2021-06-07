/* eslint-disable no-unused-vars */
import { Button, Meter } from "grommet";
import { Close, StatusGood, Upload } from "grommet-icons";
import React, { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactPlayer from "react-player";
import styled from "styled-components";
import axios from "axios";
import { resetWarningCache } from "prop-types";

const color = "#fc16de";
// const urlUpload = "https://video-file-uploader.herokuapp.com/upload";
const urlUpload = "http://localhost:3001/upload";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const PlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25%;
  .videoPlayer {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const VideoFilter = styled.div`
  z-index: 23;
  position: absolute;
  background: #a2ddff59;
  left: 0;
  display: flex;
  inset: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fc16de;
`;

const state = {
  INIT: "INIT",
  LOADED: "LOADED",
  UPLOADING: "UPLOADING",
  UPLOADED: "UPLOADED",
  COMPLETED: "COMPLETED",
  RECORDING: "RECORDING",
};
export default function UploadFile() {
  const [video, setVideo] = useState(null);
  const [fileName, setFileName] = useState("");
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(state.INIT);
  const [videoBruto, setVideoBruto] = useState(null);
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    open,
  } = useDropzone({
    accept: "video/*",
    noClick: true,
    multiple: false,
    maxSize: "50000000", //50MB
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );
  useEffect(() => {
    if (
      acceptedFiles &&
      acceptedFiles[0] &&
      acceptedFiles[0].name &&
      acceptedFiles[0].size
    ) {
      const reader = new FileReader();
      reader.readAsDataURL(acceptedFiles[0]);
      reader.onload = function () {
        setVideoBruto(acceptedFiles[0]);
        setStatus(state.LOADED);
        setVideo(reader.result);
        setFileName(acceptedFiles[0].name);
      };
    } else {
      setVideo(null);
      setFileName("");
    }
  }, [acceptedFiles]);

  const uploadVideo = async () => {
    setStatus(state.UPLOADING);
    const formData = new FormData();
    formData.append("file", videoBruto);
    formData.append("fileName", fileName);
    let config = {
      onUploadProgress: (progressEvent) => {
        let percentCompleted = Math.floor(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
      },
    };

    try {
      const res = await axios.post(urlUpload, formData, config);

      console.log({ res });
    } catch (ex) {
      console.log(ex);
    }
    setStatus(state.UPLOADED);
    setTimeout(() => {
      setStatus(state.COMPLETED);
    }, 2000);
  };

  const resetVideoStatus = () => {
    setStatus(state.INIT);
    setVideo(null);
    setVideoBruto(null);
    setFileName("");
    setProgress(0);
  };
  return (
    <div className="container">
      {status === state.INIT ? (
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Upload color={color} style={{ margin: "12px" }} />
          </div>
          <div style={{ textAlign: "center", color: color }}>
            Suelte los archivos aquí para subirlos de inmediato
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              style={{ color: color }}
              margin="small"
              secondary
              label="Grabar Video"
              onClick={() => {
                console.log("Click Button Video");
              }}
            />
            <Button
              style={{ color: color }}
              secondary
              margin="small"
              label="Subir desde la galeria"
              onClick={open}
            />
          </div>
        </div>
      ) : status === state.RECORDING ? (
        <div></div>
      ) : (
        <div style={{ width: "400px", margin: "0 auto" }}>
          <PlayerWrapper>
            {status === state.LOADED && (
              <Button
                style={{
                  color: color,
                  position: "absolute",
                  top: "0px",
                  right: "0px",
                  zIndex: "2",
                }}
                margin="small"
                color="transparent"
                onClick={() => {
                  resetVideoStatus();
                }}
              >
                <Close color={color} />
              </Button>
            )}
            <ReactPlayer
              url={video}
              controls
              playsinline
              className="videoPlayer"
              width={"100%"}
              height={"100%"}
            />
            {status === state.UPLOADING && (
              <VideoFilter>
                <Meter
                  style={{ width: "40px", height: "40px" }}
                  values={[
                    {
                      value: progress,
                      label: "sixty",
                    },
                  ]}
                  aria-label="meter"
                  type="circle"
                />
                <div>Subiendo video solicitado</div>
              </VideoFilter>
            )}
            {status === state.UPLOADED && (
              <VideoFilter style={{ zIndex: "3" }}>
                <StatusGood color={color} size="large" />
                <div>Enviado video solicitado</div>
              </VideoFilter>
            )}
          </PlayerWrapper>
          <Button
            style={{
              color: color,
              width: "100%",
              marginTop: "20px",
            }}
            secondary
            disabled={status === state.UPLOADING}
            label={
              status === state.UPLOADED || status === state.COMPLETED
                ? "Subir Nuevo Video"
                : "Enviar video"
            }
            onClick={() => {
              if (status === state.LOADED) {
                uploadVideo();
              }
              if (status === state.UPLOADED || status === state.COMPLETED) {
                resetVideoStatus();
              }
            }}
          />
        </div>
      )}
    </div>
  );
}

import { Button } from "grommet";
import { Upload } from "grommet-icons";
import React, { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactPlayer from "react-player";
import styled from "styled-components";

const color = "#fc16de";
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

export default function UploadFile() {
  const [video, setVideo] = useState(null);
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
        setVideo(reader.result);
      };
    } else setVideo(null);
  }, [acceptedFiles]);

  return (
    <div className="container">
      {video ? (
        <div style={{ width: "400px", margin: "0 auto" }}>
          <PlayerWrapper>
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
              label="✖"
              onClick={() => {
                setVideo(null);
              }}
            />
            <ReactPlayer
              url={video}
              controls
              playsinline
              className="videoPlayer"
              width={"100%"}
              height={"100%"}
            />
          </PlayerWrapper>
        </div>
      ) : (
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
      )}
    </div>
  );
}

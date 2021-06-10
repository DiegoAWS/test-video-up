import { Button, Meter } from "grommet";
import { Close, StatusGood } from "grommet-icons";
import React from "react";
import ReactPlayer from "react-player";
import { CloseButton, PlayerWrapper, VideoFilter } from "./styledComponents";
import { state } from "../struct";

export default function VideoPlayer({
  urlVideo,
  uploadProgress,
  status,
  cancel,
  uploadVideo,
}) {
  console.log({ status });
  return (
    <div style={{ width: "400px", margin: "0 auto" }}>
      <PlayerWrapper>
        {status === state.LOADED && (
          <CloseButton onClick={cancel}>
            <Close color="brand" />
          </CloseButton>
        )}
        <ReactPlayer
          url={urlVideo}
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
                  value: uploadProgress,
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
            <StatusGood color="brand" size="large" />
            <div>Enviado video solicitado</div>
          </VideoFilter>
        )}
      </PlayerWrapper>
      <Button
        style={{
          width: "100%",
          marginTop: "20px",
        }}
        color="brand"
        secondary
        disabled={status === state.UPLOADING}
        label={status === state.LOADED ? "Enviar video" : "Subir Nuevo Video"}
        onClick={() => {
          if (status === state.LOADED) {
            uploadVideo();
          } else {
            cancel();
          }
        }}
      />
    </div>
  );
}

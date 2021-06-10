import { Button, Meter } from "grommet";
import { Close, StatusGood } from "grommet-icons";
import React from "react";
import ReactPlayer from "react-player";
import { CloseButton, PlayerWrapper, VideoFilter } from "./styledComponents";
import { state } from "../struct";
const color = "red";

export default function VideoPlayer(
  urlVideo,
  uploadProgress,
  status,
  cancel,
  uploadVideo
) {
  return (
    <div style={{ width: "400px", margin: "0 auto" }}>
      <PlayerWrapper>
        {status === state.LOADED && (
          <CloseButton onClick={cancel}>
            <Close color={color} />
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
        label={status === state.LOADED ? "Subir Nuevo Video" : "Enviar video"}
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

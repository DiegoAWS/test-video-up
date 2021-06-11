import { Close } from "grommet-icons";
import React from "react";
import VideoRecorder from "react-video-recorder";
import { CloseButton, PlayerWrapper } from "./styledComponents";

export default function VideoRecorderComponent({ onChange, cancel }) {
  return (
    <div className="marker">
      <PlayerWrapper noPadding>
        <CloseButton onClick={cancel}>
          <Close color="brand" />
        </CloseButton>

        <VideoRecorder
          className="videoRecorder"
          countdownTime={0}
          onRecordingComplete={onChange}
        />
      </PlayerWrapper>
    </div>
  );
}

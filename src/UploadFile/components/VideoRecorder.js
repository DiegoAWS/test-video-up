import React from "react";

export default function VideoRecorder({ onChange }) {
  return (
    <div>
      <VideoRecorder countdownTime={0} onRecordingComplete={onChange} />
    </div>
  );
}

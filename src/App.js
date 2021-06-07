import { Grommet } from "grommet";
import { useState } from "react";
import VideoRecorder from "react-video-recorder";
import FileSection from "./FileSection";
import { celebrity } from "./theme";
function App() {
  const [showRecorder, setShowRecorder] = useState(false);

  return (
    <Grommet theme={celebrity}>
      <div className="App">
        <button
          style={{ display: "none" }}
          onClick={() => {
            setShowRecorder(!showRecorder);
          }}
        >
          {showRecorder ? "HIDE" : "SHOW"}
        </button>
        {showRecorder && (
          <VideoRecorder
            countdownTime={0}
            onRecordingComplete={(videoBlob) => {
              // Do something with the video...
              console.log("videoBlob", videoBlob);
            }}
          />
        )}
        <FileSection />
      </div>
    </Grommet>
  );
}

export default App;

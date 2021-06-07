import { FileInput } from "grommet";
import { Upload } from "grommet-icons";
import { useState } from "react";
import VideoRecorder from "react-video-recorder";

function App() {
  const [showRecorder, setShowRecorder] = useState(false);

  return (
    <div className="App">
      <button
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

      <FileInput
        name="file"
        accept=".jpg"
        onChange={(event) => {
          const file = event.target.files[0];

          console.log(file);
        }}
      >
        <Upload />
      </FileInput>
    </div>
  );
}

export default App;

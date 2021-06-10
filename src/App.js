import { Grommet } from "grommet";
import { celebrity } from "./theme";
import UploadFile from "./UploadFile";
function App() {
  const urlUpload = "https://video-file-uploader.herokuapp.com/upload";

  return (
    <Grommet theme={celebrity}>
      <div className="App">
        <UploadFile urlUpload={urlUpload} />
      </div>
    </Grommet>
  );
}

export default App;

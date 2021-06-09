import { Grommet } from "grommet";
import { celebrity } from "./theme";
import UploadFile from "./UploadFile";
function App() {
  return (
    <Grommet theme={celebrity}>
      <div className="App">
        <UploadFile />
      </div>
    </Grommet>
  );
}

export default App;

import { Grommet } from "grommet";
import FileSection from "./FileSection";
import { celebrity } from "./theme";
function App() {
  return (
    <Grommet theme={celebrity}>
      <div className="App">
        <FileSection />
      </div>
    </Grommet>
  );
}

export default App;

import MainComponent from "./components/MainComponent";
import { DataContextProvider } from "./context/dataContext";

function App() {
  return (
    <DataContextProvider>
      <MainComponent />
    </DataContextProvider>
  );
}

export default App;


import RouterMain from "./RouterMain";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
      <AppProvider>
        <RouterMain/>
      </AppProvider>
  );
}

export default App;

import "./App.css";
import { FlightSearchForm } from "./components/flight-search-form";
import { MuiProvider } from "./providers/mui.provider";

function App() {
  return (
    <MuiProvider>
      <FlightSearchForm />
    </MuiProvider>
  );
}

export default App;

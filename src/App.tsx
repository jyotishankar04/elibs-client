import DrowerLoader from "./components/DrowerLoader";
import RouteManagement from "./RouteManagement";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <DrowerLoader />
      <Toaster></Toaster>
      <RouteManagement></RouteManagement>
    </>
  );
}

export default App;

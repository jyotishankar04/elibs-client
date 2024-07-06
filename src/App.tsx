import DrowerLoader from "./components/DrowerLoader";
import FeedBackPopUp from "./components/FeedBackPopUp";
import RouteManagement from "./RouteManagement";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <FeedBackPopUp />
      <DrowerLoader />
      <Toaster></Toaster>
      <RouteManagement></RouteManagement>
    </>
  );
}

export default App;

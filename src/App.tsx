import { useEffect, useState } from "react";
import DrowerLoader from "./components/DrowerLoader";
import RouteManagement from "./RouteManagement";
import { Toaster } from "react-hot-toast";
import DownPhase from "./pages/DownPhase";
function App() {
  const [isDwon, setIsDwon] = useState(false);
  useEffect(() => {
    setIsDwon(true);
  }, []);

  if (isDwon) {
    return (
      <div className="xl:container w-full p-3 mx-auto ">
        <DownPhase />
      </div>
    );
  }

  return (
    <>
      <DrowerLoader />
      <Toaster></Toaster>
      <RouteManagement></RouteManagement>
    </>
  );
}

export default App;

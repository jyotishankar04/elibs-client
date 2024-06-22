import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ManageRoute from "./utils/ManageRoute";

function App() {
  return (
    <div className="flex flex-col justify-between w-full h-screen">
      <div className="border-b-2">
        <Navbar />
      </div>
      <div className="h-full overflow-auto w-full">
        <ManageRoute />
      </div>
      <Footer />
    </div>
  );
}

export default App;

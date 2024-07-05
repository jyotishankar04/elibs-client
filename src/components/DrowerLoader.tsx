import { useSelector } from "react-redux";
import { RootState } from "../store/store";

function DrowerLoader() {
  // const store
  const containerLoading = useSelector(
    (state: RootState) => state.util.drowerLoader
  );
  return (
    <div
      className={`w-full z-50 h-screen  bg-gray-600/40 ${
        containerLoading ? "block" : "hidden"
      } fixed flex justify-center items-center`}
    >
      <div className="w-96 h-60 bg-white rounded-lg flex items-center justify-center">
        <div className="w-24 animate-spin border-y-0 h-24 border-8 border-black rounded-full"></div>
      </div>
    </div>
  );
}

export default DrowerLoader;

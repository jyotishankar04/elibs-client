import { useSelector } from "react-redux";
import { RootState } from "../store/store";

function DrowerLoader() {
  // const store
  const containerLoading = useSelector(
    (state: RootState) => state.util.drowerLoader
  );
  return (
    <div
      className={`w-full z-[80] h-screen  bg-gray-600/40 ${
        containerLoading ? "block" : "hidden"
      } fixed flex justify-center items-center`}
    >
      <div className="w-96 h-60 bg-white rounded-lg flex items-center flex-col justify-center">
        <h1 className="text-xl sm:text-3xl font-semibold text-gray-800 mb-5">
          Loading please wait...
        </h1>
        <div className="w-16 sm:w-24 animate-spin border-y-0 h-16 sm:h-24 border-8 border-black rounded-full"></div>
      </div>
    </div>
  );
}

export default DrowerLoader;

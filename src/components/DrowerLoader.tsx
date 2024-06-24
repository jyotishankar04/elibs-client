import { useSelector } from "react-redux";
import { State } from "../features/books/bookSlice";
import { Card } from "./ui/card";

const DrowerLoader = () => {
  const open = useSelector((state: State) => state.isUploading);
  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } absolute w-full h-screen z-50 bg-slate-500/60 top-0 left-0 flex justify-center items-center`}
    >
      <Card className="w-[300px] h-[200px] flex justify-center items-center">
        <div className="p-10 border-8 border-x-transparent w-fit border-black rounded-full animate-spin"></div>
      </Card>
    </div>
  );
};

export default DrowerLoader;

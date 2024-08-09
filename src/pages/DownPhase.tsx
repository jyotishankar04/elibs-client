import { TbServerOff } from "react-icons/tb";

const DownPhase = () => {
  return (
    <div className="w-full h-full flex justify-center flex-col mt-10 gap-10 items-center">
      <TbServerOff size={"200px"} className="text-red-600" />
      <h1 className="text-3xl text-red-500">Our server is currently down</h1>
      <p className="text-red-600 text-xl">We are working. Please stay tuned!</p>
    </div>
  );
};

export default DownPhase;

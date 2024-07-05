import { MdConstruction } from "react-icons/md";
function UnderConstruction() {
  return (
    <div className="text-3xl flex flex-col gap-3 justify-center items-center w-full">
      <MdConstruction className="text-9xl text-red-500" />
      <h2 className="text-red-500">Feature is under constructions</h2>
    </div>
  );
}

export default UnderConstruction;

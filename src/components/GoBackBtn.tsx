import { GiFastBackwardButton } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

function GoBackBtn() {
  const navigate = useNavigate();

  return (
    <div className="col-span-3 sm:col-span-1">
      <button
        className="bg-orange-500 px-4 cursor-pointer py-2 mt-2 ml-6 rounded-xl text-white sm:text-2xl"
        onClick={() => navigate("/")}
      >
        <GiFastBackwardButton />
      </button>
    </div>
  );
}

export default GoBackBtn;

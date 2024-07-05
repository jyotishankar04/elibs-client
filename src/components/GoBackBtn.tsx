import { GiFastBackwardButton } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

function GoBackBtn() {
  const navigate = useNavigate();

  return (
    <div>
      <button
        className="bg-orange-500 px-4 py-2 mt-2 rounded-xl text-white text-2xl"
        onClick={() => navigate("/")}
      >
        <GiFastBackwardButton />
      </button>
    </div>
  );
}

export default GoBackBtn;

import { useState } from "react";
import { Link } from "react-router-dom";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

function UserMenu() {
  const user = useSelector((state: RootState) => state.user);

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-14  h-14 relative  rounded-lg"
      >
        <img
          className=" cursor-pointer object-cover object-center aspect-square rounded-full"
          src={user.profileImage}
        ></img>
        <div
          className={`absolute left-[50%] w-40  ${
            isOpen ? "block" : "hidden"
          } -translate-x-[50%] rounded-md  bg-gray-50 border-2  flex flex-col `}
        >
          <Link
            onClick={() => setIsOpen(false)}
            to={"/user/profile"}
            className="text-xl font-semibold  text-gray-600 p-3 hover:bg-gray-200"
          >
            Profile
          </Link>

          <Link
            onClick={() => setIsOpen(false)}
            to={"user/upload"}
            className="text-xl font-semibold  text-gray-600 p-3 hover:bg-gray-200"
          >
            Publish Book
          </Link>

          <Link
            onClick={() => setIsOpen(false)}
            to={"/user/settings/general"}
            className="text-xl font-semibold  text-gray-600 p-3 hover:bg-gray-200"
          >
            Settings
          </Link>

          <Link
            to={"/auth/signin"}
            onClick={() => localStorage.removeItem("token")}
            className="text-xl font-semibold text-gray-600 p-3 hover:bg-gray-200"
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserMenu;

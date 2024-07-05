import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";

function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) setIsLogin(true);
    else setIsLogin(false);
  }, [isLogin]);
  return (
    <div
      className={`container bg-white sticky top-0 border-b-2 mx-auto py-5 px-5 z-50  flex justify-between items-center 
        
      `}
    >
      <div className="text-3xl  font-semibold ">
        <Link to={"/"} className="text-orange-600">
          coders_BooK
        </Link>
      </div>
      <div className={`flex gap-5 ${isLogin ? "hidden" : "block"}`}>
        <Link
          to={"/auth/signin"}
          className="bg-white border-2 border-orange-500 transition-colors  hover:bg-orange-200 text-orange-600 py-2 px-5 text-xl font-semibold rounded-lg"
        >
          Sign in
        </Link>
        <Link
          to={"/auth/signup"}
          className="text-white bg-orange-600 hover:bg-orange-800 py-2 px-5 transition-colors text-xl font-semibold rounded-lg"
        >
          Sign up
        </Link>
      </div>
      <div className={`${isLogin ? "block" : "hidden"}`}>
        <UserMenu />
      </div>
    </div>
  );
}

export default Navbar;

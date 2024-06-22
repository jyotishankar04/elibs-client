import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../features/books/bookSlice";

function Navbar() {
  const dispatch = useDispatch();
  const isLogin = useSelector<{ isLoggedIn: boolean }>(
    (state) => state.isLoggedIn
  );
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(login());
    }
  }, [dispatch]);
  return (
    <div className="container mx-auto py-5 px-5  flex justify-between items-center">
      <div className="text-3xl  font-semibold ">
        <Link to={"/"} className="text-primary-600">
          coders_BooK
        </Link>
      </div>
      <div
        className={`flex gap-3 items-center ${isLogin ? "hidden" : "block"}`}
      >
        <button
          className=" border-primary-400 border-2 rounded-md px-6 py-2 text-primary-600 font-semibold
        hover:bg-primary-200 hover:border-primary-200
        active:bg-primary-400 hover:text-white active:border-primary-400 "
        >
          Sign in
        </button>
        <button
          className=" border-primary-600 bg-primary-600 border-2 rounded-md px-6 py-2 text-white font-semibold
        hover:bg-primary-800 hover:border-primary-800
        active:bg-primary-400 hover:text-white active:border-primary-400 "
        >
          Sign Up
        </button>
      </div>
      {/* <div></div> */}
    </div>
  );
}

export default Navbar;

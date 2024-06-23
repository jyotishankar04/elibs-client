import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { login, logout, State } from "../features/books/bookSlice";
import NavMenu from "./NavMenu";
import { Button } from "./ui/button";

function Navbar() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state: State) => state.isLoggedIn);
  const [navshow, setNavShow] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(login());
    } else {
      dispatch(logout());
    }
    if (location.pathname === "/auth/signup") {
      setNavShow(false);
    } else {
      setNavShow(true);
    }
  }, [dispatch, location]);
  return (
    <div
      className={`container mx-auto py-5 px-5  flex justify-between items-center ${
        navshow ? "block" : "hidden"
      }`}
    >
      <div className="text-3xl  font-semibold ">
        <Link to={"/"} className="text-orange-600">
          coders_BooK
        </Link>
      </div>
      <div
        className={`flex gap-3 items-center ${isLogin ? "hidden" : "block"}`}
      >
        <Button variant={"outline"}>
          <Link to={"/auth/signin"}>Sign in</Link>
        </Button>
        <Button>
          <Link to={"/auth/signup"}>Sign up</Link>
        </Button>
      </div>
      <div className={`${isLogin ? "block" : "hidden"}`}>
        <NavMenu />
      </div>
      {/* <div></div> */}
    </div>
  );
}

export default Navbar;

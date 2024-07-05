import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { fetchUser } from "../store/asyncReducres/fetch";
import { useAppDispatch } from "../store/hooks.ts";

function HomeLayout() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default HomeLayout;

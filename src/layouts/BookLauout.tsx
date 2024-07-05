import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import SignupPopUp from "../components/SignupPopUp";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setSignUpPopUpStatus } from "../store/Slice/utilSlice";

function BookLauout() {
  const state = useSelector((state: RootState) => state.util.signUpPopUpStatus);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      dispatch(setSignUpPopUpStatus(true));
      return;
    } else {
      dispatch(setSignUpPopUpStatus(false));
    }
  }, [dispatch]);
  return (
    <div>
      <div className={`${state ? "block" : "hidden"}`}>
        <SignupPopUp />
      </div>
      <Outlet />
    </div>
  );
}

export default BookLauout;

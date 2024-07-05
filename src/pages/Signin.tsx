import { useAppDispatch } from "../store/hooks.ts";

import { useState } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { endDrowerLoader, startDrowerLoader } from "../store/Slice/utilSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { fetchUser } from "../store/asyncReducres/fetch";
interface InputType {
  email: string;
  password: string;
}
function Signin() {
  const [inputValue, setInputValue] = useState<InputType>({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValue({ ...inputValue, [name]: value });
  };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(startDrowerLoader()); // Redux action to start drower loader
    const data = {
      email: inputValue.email,
      password: inputValue.password,
    };
    try {
      const res = await axios.post(
        `http://ec2-13-202-141-182.ap-south-1.compute.amazonaws.com/api/v1/users/login`,
        data
      );
      localStorage.setItem("token", res.data.accessToken);

      dispatch(fetchUser());
      toast.success("User registered successfully");
      setInputValue({ email: "", password: "" });
      dispatch(endDrowerLoader()); // Redux action to start drower loader
      navigate("/");
    } catch (error) {
      toast.error("Error in User registration");
      dispatch(endDrowerLoader());
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-96 p-8 bg-gray-50 rounded-md ring-1 ring-gray-300 text-center text-gray-900">
        <h1 className={`text-2xl font-bold mb-6`}>Login</h1>
        <form action="" onSubmit={handleSubmit}>
          <Input
            label="Email"
            name={"email"}
            type={"email"}
            value={inputValue.email}
            onChange={handleChange}
            placeholder="jhon@mail.com"
          />
          <Input
            label="Password"
            name={"password"}
            type={"password"}
            value={inputValue.password}
            onChange={handleChange}
            placeholder="********"
          />
          <button
            className={`w-full mt-4 bg-slate-700 text-white py-3 rounded-md focus:outline-none transition-colors hover:bg-slate-500/90`}
            type="submit"
          >
            Login
          </button>
        </form>
        <div>
          <h1 className="mt-4 font-semibold text-gray-700">
            Don't have Account?{" "}
            <Link to={"/auth/signup"} className="underline">
              Create Account
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Signin;

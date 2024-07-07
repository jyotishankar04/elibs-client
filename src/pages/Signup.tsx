import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import axios from "axios";
import { useDispatch } from "react-redux";
import { endDrowerLoader, startDrowerLoader } from "../store/Slice/utilSlice";
import toast from "react-hot-toast";

export interface SignupType {
  fullName: string;
  email: string;
  password: string;
}

function Signup() {
  const [inputValue, setInputValue] = useState<SignupType>({
    fullName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValue({ ...inputValue, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      inputValue.email == "" ||
      inputValue.fullName == "" ||
      inputValue.password == ""
    ) {
      toast.error("All fields are required", { duration: 1000 });
      return;
    }
    if (inputValue.password.length < 6) {
      toast.error("Password must be at least 6 characters", { duration: 1000 });
      return;
    }
    dispatch(startDrowerLoader()); // Redux action to start drower loader
    const data = {
      name: inputValue.fullName,
      email: inputValue.email,
      password: inputValue.password,
    };
    try {
      const res = await axios.post(
        `https://elibapi.devsuvam.xyz/api/v1/users/register`,
        data
      );
      localStorage.setItem("token", res.data.accessToken);

      dispatch(endDrowerLoader()); // Redux action to start drower loader
      toast.success("User registered successfully");
      setInputValue({ fullName: "", email: "", password: "" });
      navigate("/");
    } catch (error) {
      toast.error("Error in User registration");
      dispatch(endDrowerLoader());
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-96 p-8 bg-gray-50 rounded-md ring-1 ring-gray-300 text-center text-gray-900">
        <h1 className={`text-2xl font-bold mb-6`}>Create Account</h1>
        <form action="" onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            name={"fullName"}
            type={"text"}
            value={inputValue.fullName}
            onChange={handleChange}
            placeholder="jhon doe"
          />
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
            Create Account
          </button>
          <div>
            <h1 className="mt-4 font-semibold text-gray-700">
              Already have account?{" "}
              <Link to={"/auth/signin"} className="underline">
                Login
              </Link>
            </h1>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

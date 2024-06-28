import { useState } from "react";
import { useLocation } from "react-router-dom";
import Input from "../components/Input";

export interface SignupType {
  fullName: string;
  email: string;
  password: string;
}

function Signup() {
  // useEffect(() => {
  // if (location.pathname === "auth/signup") {
  // }
  // }, [location]);
  const [inputValue, setInputValue] = useState<SignupType>({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-96 p-8 bg-gray-50 rounded-md ring-1 ring-gray-300 text-center text-gray-900">
        <h1 className={`text-2xl font-bold mb-6`}>Create Account</h1>
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
      </div>
    </div>
  );
}

export default Signup;

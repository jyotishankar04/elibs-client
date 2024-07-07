import { Link } from "react-router-dom";

function SignupPopUp() {
  return (
    <div className="w-full h-screen  flex justify-center items-center z-50 bg-gray-600/35 top-0  fixed">
      <div className=" p-4 bg-white rounded-lg flex-col gap-10 w-[80%] h-[80%] flex items-center justify-center">
        <h1 className="text-gray-800 text-center  sm:text-4xl font-semibold">
          Please Sign up to continue reading
        </h1>
        <Link
          to={"/auth/signup"}
          className="text-white  bg-orange-600 py-2 px-6 rounded-lg sm:text-2xl"
        >
          Click here to Sign Up
        </Link>
      </div>
    </div>
  );
}

export default SignupPopUp;

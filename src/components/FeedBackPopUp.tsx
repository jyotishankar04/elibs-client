import { useEffect, useState } from "react";
import { IoMdConstruct } from "react-icons/io";
function FeedBackPopUp() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 2000); // Show the pop-up after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setShow(false);
  };
  return (
    <div
      className={`transition-opacity ${
        show ? "block" : "hidden"
      } w-full h-screen flex justify-center items-center  bg-gray-500/30 fixed top-0 left-0 z-[90]`}
    >
      <div className="p-5 bg-white rounded-lg w-[90%] h-[80%] flex gap-5 justify-start  flex-col items-center">
        <h1 className="text-3xl text-orange-500 font-bold pt-20">
          Welcome to Coders Book
        </h1>
        <IoMdConstruct className="text-9xl text-red-700" />

        <p className="text-red-600 font-bold text-xl ">
          *****Important Message*****
        </p>
        <p className="text-xl text-center text-red-500 w-[80%]">
          We are excited to announce that Coders Book has been launched.This
          site is under development phase. We are working hard to bring you a
          better experience. Please feel free to contact us at <br />
          <a
            href="mailto:patrajyotishankar@gmail.com "
            className="text-blue-800 hover:underline"
          >
            patrajyotishankar@gmail.com
          </a>
        </p>
        <button
          onClick={closePopup}
          className="px-10 py-2 bg-orange-600 text-white rounded-xl hover:rounded-md hover:bg-orange-700 duration-200 text-2xl"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default FeedBackPopUp;

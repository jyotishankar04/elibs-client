import { useEffect, useState } from "react";
import GoBackBtn from "../components/GoBackBtn";
import { useSelector } from "react-redux";
import { Book, fetchUser } from "../store/asyncReducres/fetch";
import { RootState } from "../store/store";
import { Link } from "react-router-dom";
import { CgInstagram } from "react-icons/cg";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { timeElapsedSince } from "../utils/timeCalculate";
import { useAppDispatch } from "../store/hooks.ts";

import BookCard from "../components/BookCard";
import WishlistCard from "../components/WishlistCard";
function Profile() {
  const [toggleView, setToggleView] = useState(1);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  const user = useSelector((state: RootState) => state.user);
  return (
    <div className="sm:container w-full mx-auto">
      <div className="grid grid-cols-10 h-full items-center  ">
        <GoBackBtn />
        <h1 className="sm:col-span-9 col-span-6 text-center text-lg sm:text-2xl font-semibold text-gray-800">
          Welcome to your Profile{" "}
        </h1>
      </div>
      <div className="sm:grid flex flex-col sm:items-start  items-center  sm:grid-cols-3 sm:gap-6 mt-3">
        <div className="sm:shadow-md w-full p-4 flex-col flex items-center justify-center rounded-lg">
          <Link
            to={user.profileImage}
            target="_blank"
            className="aspect-square w-[50%] sm:w-full rounded-full overflow-hidden "
          >
            <img
              loading="lazy"
              src={user.profileImage}
              className="object-cover object-center w-full "
            />
          </Link>
          <Link
            className="bg-gray-800 sm:py-3 py-2 text-sm px-8 hover:bg-gray-950 text-white mt-4 rounded-lg"
            to={`/user/settings/general`}
          >
            Edit Profile
          </Link>
        </div>
        <div
          className="shadow-md flex
          flex-col justify-start items-center sm:items-start p-5 col-span-2 sm:text-xl gap-4"
        >
          <h1 className="sm:text-3xl text-xl text-orange-500 font-semibold  ">
            {user.name}
          </h1>
          <p className="">Bio : {user.bio}</p>

          <p>Created : {timeElapsedSince(user.createdAt)}</p>
          <div className="text-xl sm:text-3xl flex gap-10">
            <Link
              to={user.instagramUrl}
              target="_blank"
              className={`${
                user.instagramUrl != "" && user.instagramUrl != undefined
                  ? "block"
                  : "hidden"
              } text-pink-600 hover:text-black duration-100`}
            >
              <CgInstagram />
            </Link>
            <Link
              to={user.linkedinUrl}
              target="_blank"
              className={`${
                user.linkedinUrl != "" && user.linkedinUrl != undefined
                  ? "block"
                  : "hidden"
              } text-blue-900 hover:text-black duration-100`}
            >
              <FaLinkedin />
            </Link>
            <Link
              to={user.twitterUrl}
              target="_blank"
              className={`${
                user.twitterUrl != "" && user.twitterUrl != undefined
                  ? "block"
                  : "hidden"
              } text-gray-950 hover:text-black duration-100`}
            >
              <FaXTwitter />
            </Link>
          </div>
          <div className="mt-10 text-red-800">
            <h1 className="text-center">
              More features will added soon..........
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full  p-5 shadow-lg">
        <nav className=" flex text-sm sm:text-lg items-center sm:gap-5 gap-2">
          <p
            onClick={() => setToggleView(1)}
            className={`${
              toggleView == 1 ? "bg-gray-200 " : "border-2"
            } w-6/12 p-3 rounded-md cursor-pointer `}
          >
            Wishlist
          </p>
          <p
            onClick={() => setToggleView(2)}
            className={`${
              toggleView == 2 ? "bg-gray-200 " : "border-2"
            } w-6/12  p-3  rounded-md cursor-pointer `}
          >
            Published Books
          </p>
        </nav>
        <div>
          {toggleView == 1 ? (
            <div className="flex flex-col gap-4 w-full">
              {Array.isArray(user.wishlist) &&
                user.wishlist.map((book, index) => (
                  <WishlistCard book={book} key={index} />
                ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 ">
              {user.publishedBooks.length > 0 ? (
                user.publishedBooks.map((book: Book, index) => (
                  <BookCard key={index} book={book} />
                ))
              ) : (
                <h1 className="text-center w-full col-span-3 text-gray-700">
                  You have not published any book
                </h1>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;

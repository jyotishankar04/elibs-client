import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader, CardTitle } from "../components/ui/card";
import { State } from "../features/books/bookSlice";
import { timeElapsedSince } from "../utils/TimeCalculate";
import { Book } from "../components/BookList";
import BookCard from "../components/BookCard";
import { useEffect } from "react";
import { getProfileDetails } from "../features/books/fetchHomeBooks";
import { FaXTwitter } from "react-icons/fa6";

import { Linkedin, StepBackIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import { HoverCard, HoverCardContent } from "../components/ui/hover-card";
import { HoverCardTrigger } from "@radix-ui/react-hover-card";
import { CgInstagram } from "react-icons/cg";

function Profile() {
  const navigate = useNavigate();
  const user = useSelector((state: State) => state.userInfo);
  return (
    <div className="container my-2 mx-auto  flex flex-col  gap-3  ">
      <div className="grid grid-cols-10 items-center">
        <Button className="bg-orange-500" onClick={() => navigate("/")}>
          <StepBackIcon />
        </Button>
        <h1 className="col-span-9 text-center text-2xl font-bold text-gray-600">
          Welcome to your Profile
        </h1>
      </div>
      <Card className="grid grid-cols-2 w-full   ">
        <CardHeader className="  items-center h-fit">
          <div className="">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Link
                  className="relative flex justify-center w-full"
                  to={user.profileImage}
                  target="_blank"
                >
                  <img
                    src={user.profileImage}
                    className="w-8/12 border-2 hover:ring-2 hover:ring-orange-600  cursor-pointer object-contain object-center aspect-square  rounded-full"
                  ></img>
                </Link>
              </HoverCardTrigger>
              <HoverCardContent className="w-60 ">
                <h1 className="w-full py-4 text-xl font-semibold text-gray-700 text-center">
                  Click to View
                </h1>
              </HoverCardContent>
            </HoverCard>
          </div>
        </CardHeader>
        <div className="p-5  flex flex-col gap-3">
          <CardTitle className="pt-2 text-3xl">{user.name}</CardTitle>
          <p className="font-semibold text-gray-500">{user.bio}</p>
          <div className="text-3xl flex gap-10">
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
          <h2 className="text-xl font-semibold text-gray-500">
            Date of birth: {user.dob}
          </h2>

          <h2 className="text-xl font-semibold text-gray-500">
            Created: {timeElapsedSince(user.createdAt.toString())}
          </h2>
        </div>
      </Card>
      <Card className="col-span-2 p-4 ">
        <CardTitle className="mb-2">Published Books</CardTitle>
        <div className=" gap-2 grid grid-cols-2 overscroll-auto h-full">
          {user.publishedBooks.length > 0 ? (
            user.publishedBooks.map((book: Book, index) => (
              <BookCard key={index} book={book} />
            ))
          ) : (
            <h1 className="text-center my-10">
              You have not published any books
            </h1>
          )}
        </div>
      </Card>
    </div>
  );
}

export default Profile;

import { useEffect, useState } from "react";
import GoBackBtn from "../components/GoBackBtn";
import { Book, User } from "../store/asyncReducres/fetch";
import { Link, useParams } from "react-router-dom";
import { CgInstagram } from "react-icons/cg";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { timeElapsedSince } from "../utils/timeCalculate";
import BookCard from "../components/BookCard";
import axios from "axios";

function UserProfilePage() {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    _id: "",
    profileImage: "",
    wishlist: [],
    bio: "",
    instagramUrl: "",
    linkedinUrl: "",
    twitterUrl: "",
    createdAt: "",
    publishedBooks: [],
    updatedAt: "",
    dob: "",
  });
  const { userId } = useParams();
  const fetchUserProfile = async () => {
    const res = await axios.get(
      `http://ec2-13-202-141-182.ap-south-1.compute.amazonaws.com/api/v1/users/user/${userId}`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    setUser(res.data.user);
  };
  useEffect(() => {
    fetchUserProfile();
  }, [userId]);
  return (
    <div>
      {user.name != "" ? (
        <div className="container mx-auto  ">
          <div className="grid grid-cols-10 h-full items-center  ">
            <GoBackBtn />
            <h1 className="col-span-9 text-center text-2xl font-semibold text-gray-800">
              Welcome to your Profile{" "}
            </h1>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-3">
            <div className="shadow-md p-4 flex items-center justify-center rounded-lg">
              <Link
                to={user.profileImage}
                target="_blank"
                className="aspect-square  w-full rounded-full overflow-hidden "
              >
                <img
                  loading="lazy"
                  src={user.profileImage}
                  className="object-cover object-center w-full "
                />
              </Link>
            </div>
            <div
              className="shadow-md flex
          flex-col justify-start items-start p-5 col-span-2 text-xl gap-4"
            >
              <h1 className="text-3xl text-orange-500 font-semibold  ">
                {user.name}
              </h1>
              <p>Bio : {user.bio}</p>

              <p>Date of birth : {user.dob}</p>
              <p>Created : {timeElapsedSince(user.createdAt)}</p>
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
              <div className="mt-10 text-red-800">
                <h1 className="text-center">
                  More features will added soon..........
                </h1>
              </div>
            </div>
          </div>
          <div className="w-full  p-5 shadow-lg">
            <h1 className="text-3xl text-orange-500 font-semibold  ">
              Your Published Books
            </h1>
            <div className="flex justify-start gap-10 flex-wrap">
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
          </div>
        </div>
      ) : (
        <h1>Loading......</h1>
      )}
    </div>
  );
}

export default UserProfilePage;

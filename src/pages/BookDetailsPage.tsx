import { FaCheck } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Book, fetchUser } from "../store/asyncReducres/fetch";
import axios from "axios";
import { timeElapsedSince } from "../utils/timeCalculate";
import { FaRegHeart } from "react-icons/fa";
import { IoIosCloudDownload } from "react-icons/io";
import { GiFastBackwardButton } from "react-icons/gi";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import toast from "react-hot-toast";
import { useAppDispatch } from "../store/hooks.ts";
import Loading from "../components/Loading.tsx";

function BookDetailsPage() {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [book, setBook] = useState<Book | undefined>();
  const fetchCurrentBook = async (bookId: string) => {
    const res = await axios.get(
      `https://elibapi.devsuvam.xyz/api/v1/books/book/${bookId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setBook(res.data.data[0]);
  };

  const [buttonLoading, setButtonLoading] = useState(false);

  const dispatch = useAppDispatch();
  const idArray = useSelector(
    (state: RootState) => state.user.wishlistArray as string[]
  );
  const handleAddToWishlist = async () => {
    try {
      setButtonLoading(true);
      await axios.post(
        `https://elibapi.devsuvam.xyz/api/v1/books/wishlist/add`,
        {
          bookId: book?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(fetchUser());
      setButtonLoading(false);
      toast.success("Book added to wishlist");
    } catch (error) {
      console.error(error);
      toast.error("Error adding book to wishlist");
      setButtonLoading(false);
    }
  };
  useEffect(() => {
    fetchCurrentBook(bookId as string);
  }, [bookId]);
  if (!book) {
    return <Loading />;
  }
  return (
    <div className="container mx-auto mt-1">
      <div>
        <button
          className="bg-orange-500 px-4 py-2 rounded-xl text-white text-2xl"
          onClick={() => navigate("/")}
        >
          <GiFastBackwardButton />
        </button>
      </div>
      <div className="grid grid-cols-2 mt-2">
        <div className="p-4 rounded-lg mx-auto">
          <img src={book?.coverImage} alt="" className="rounded-lg max-h-96" />
        </div>
        <div className="flex flex-col justify-start gap-3 p-4">
          <h1 className="text-3xl font-semibold capitalize text-orange-600">
            {book?.title}
          </h1>
          <h3 className="text-xl capitalize  text-gray-700">
            {book?.description}
          </h3>
          <h2>Author : {book?.author}</h2>
          <h2>
            Published By :
            <Link
              to={`/user/${book?.uploadedBy._id}`}
              className="underline hover:text-orange-400"
            >
              {" "}
              {book?.uploadedBy.name}
            </Link>
          </h2>
          <h4>
            Last Update: {book && timeElapsedSince(book.updatedAt.toString())}
          </h4>
          <h4>
            First Publish: {book && timeElapsedSince(book.createdAt.toString())}
          </h4>
          <div className="flex justify-start gap-10">
            <button
              className={`text-white min-w-10 ${
                book?._id && idArray.includes(book._id)
                  ? "bg-gray-300 cursor-not-allowed "
                  : "hover:bg-orange-800 bg-orange-600"
              } text-lg px-2 py-2 rounded-lg `}
              disabled={book?._id && idArray.includes(book?._id) ? true : false}
              onClick={handleAddToWishlist}
            >
              {buttonLoading ? (
                <div className="w-5 h-5 border-y-transparent  animate-spin border-4 rounded-full border-white"></div>
              ) : book?._id && idArray.includes(book?._id) ? (
                <p className="flex gap-2 items-center ">
                  Added
                  <FaCheck />
                </p>
              ) : (
                <p className="text-md items-center px-5 rounded-xl text-white flex gap-3 ">
                  Add to wishlist <FaRegHeart />
                </p>
              )}
            </button>
            <button className=" text-white bg-gray-400 px-5 py-2 rounded-md hover:bg-slate-500 flex items-center gap-3">
              <Link to={`${book?.file}`} target="_blank">
                Read & Download
              </Link>
              <IoIosCloudDownload />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetailsPage;

import { Link } from "react-router-dom";
import { Book, fetchUser } from "../store/asyncReducres/fetch";
import { RootState } from "../store/store";
import { FaCheck } from "react-icons/fa6";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
interface BookProps {
  book: Book;
}
const BookCard: React.FC<BookProps> = ({ book }) => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const dispatch = useAppDispatch();
  const idArray = useAppSelector(
    (state: RootState) => state.user.wishlistArray
  );
  const handleAddToWishlist = async () => {
    try {
      setButtonLoading(true);
      await axios.post(
        `http://ec2-13-202-141-182.ap-south-1.compute.amazonaws.com/api/v1/books/wishlist/add`,
        {
          bookId: book._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      await dispatch(fetchUser()).unwrap();
      setButtonLoading(false);
      toast.success("Book added to wishlist");
    } catch (error) {
      console.error(error);
      toast.error("Error adding book to wishlist");
      setButtonLoading(false);
    }
  };

  if (idArray.length > 0) {
    return (
      <div className=" flex items-center aspect-[9/16]  flex-col gap-3">
        <Link
          to={`/book/${book._id}`}
          className="aspect-[12/16] w-52 overflow-hidden rounded-md bg-slate-300"
        >
          <img
            loading="lazy"
            src={book.coverImage}
            className="w-full hover:scale-110 bg-gray-300  h-full duration-300 object-cover object-center"
          />
        </Link>
        <div className="text-center  mb-3 w-full flex flex-col  items-center justify-center">
          <Link
            to={`/book/${book._id}`}
            className="text-2xl line-clamp-2 hover:text-orange-500 cursor-pointer hover:underline duration-150"
          >
            {book.title}
          </Link>
          <p className="text-sm ">{book.author}</p>

          <Link
            to={`/user/${book.uploadedBy._id}`}
            className="text-sm underline"
          >
            {book.uploadedBy.name}
          </Link>
          <button
            className={`text-white min-w-10 ${
              idArray.includes(book._id)
                ? "bg-gray-300 cursor-not-allowed "
                : "hover:bg-orange-800 bg-orange-600"
            } text-lg px-2 py-2 rounded-sm  `}
            disabled={idArray.includes(book._id) ? true : false}
            onClick={handleAddToWishlist}
          >
            {buttonLoading ? (
              <div className="w-5 h-5 border-y-transparent animate-spin border-4 rounded-full border-white"></div>
            ) : idArray.includes(book._id) ? (
              <p className="flex gap-2 items-center">
                Added
                <FaCheck />
              </p>
            ) : (
              <p className="text-sm ">Add to wishlist</p>
            )}
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className=" flex items-center aspect-[9/16]  flex-col gap-3">
        <Link
          to={`/book/${book._id}`}
          className="aspect-[12/16] w-52 overflow-hidden rounded-md bg-slate-300"
        >
          <img
            loading="lazy"
            src={book.coverImage}
            className="w-full hover:scale-110 bg-gray-300  h-full duration-300 object-cover object-center"
          />
        </Link>
        <div className="text-center  mb-3 w-full flex flex-col  items-center justify-center">
          <Link
            to={`/book/${book._id}`}
            className="text-2xl line-clamp-2 hover:text-orange-500 cursor-pointer hover:underline duration-150"
          >
            {book.title}
          </Link>
          <p className="text-sm ">{book.author}</p>

          <Link
            to={`/user/${book.uploadedBy._id}`}
            className="text-sm underline"
          >
            {book.uploadedBy.name}
          </Link>
          <button
            className={`text-white min-w-10 ${
              idArray.includes(book._id)
                ? "bg-gray-300 cursor-not-allowed "
                : "hover:bg-orange-800 bg-orange-600"
            } text-lg px-2 py-2 rounded-sm  `}
            disabled={idArray.includes(book._id) ? true : false}
            onClick={handleAddToWishlist}
          >
            {buttonLoading ? (
              <div className="w-5 h-5 border-y-transparent animate-spin border-4 rounded-full border-white"></div>
            ) : idArray.includes(book._id) ? (
              <p className="flex gap-2 items-center">
                Added
                <FaCheck />
              </p>
            ) : (
              <p className="text-sm ">Add to wishlist</p>
            )}
          </button>
        </div>
      </div>
    );
  }
};

export default BookCard;
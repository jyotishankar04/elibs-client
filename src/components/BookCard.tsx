import { Link, useLocation } from "react-router-dom";
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
  const [deleteButtonLoading, setDeleteButtonLoading] = useState(false);

  const dispatch = useAppDispatch();
  const location = useLocation();
  const idArray = useAppSelector(
    (state: RootState) => state.user.wishlistArray as string[]
  );
  const handleAddToWishlist = async () => {
    try {
      setButtonLoading(true);
      await axios.post(
        `https://elibapi.devsuvam.xyz/api/v1/books/wishlist/add`,
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
  const deleteBook = async () => {
    setDeleteButtonLoading(true);
    try {
      await axios.delete(
        `https://elibapi.devsuvam.xyz/api/v1/books/delete/${book._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      await dispatch(fetchUser()).unwrap();

      toast.success("Book deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting book");
    }
    setDeleteButtonLoading(false);
  };
  console.log(book);

  return (
    <div className=" sm:flex sm:items-center   sm:flex-col grid grid-cols-2 md:p-2 gap-3">
      <Link
        to={`/book/${book && book._id}`}
        className="aspect-[12/16] mx-auto w-40 sm:w-52 overflow-hidden rounded-md bg-slate-300"
      >
        <img
          loading="lazy"
          src={book && book.coverImage}
          className="w-full hover:scale-110 bg-gray-300  h-full duration-300 object-cover object-center"
        />
      </Link>
      <div className="text-center justify-between  mb-3 w-full flex flex-col  items-center sm:justify-center">
        <Link
          to={`/book/${book && book._id}`}
          className=" text-lg md:text-2xl md:line-clamp-2
            line-clamp-4 
            hover:text-orange-500 cursor-pointer hover:underline duration-150"
        >
          {book && book.title}
        </Link>
        <p className="text-sm ">{book && book.author}</p>

        <Link
          to={`/user/${book && book.uploadedBy._id}`}
          className="text-sm underline"
        >
          {book && book.uploadedBy.name}
        </Link>
        <div className="grid grid-cols-2 gap-1 ">
          <button
            className={`text-white min-w-10 ${
              book?._id && idArray.includes(book && book._id)
                ? "bg-gray-300 cursor-not-allowed "
                : "hover:bg-orange-800 bg-orange-600"
            } text-lg px-2 py-2 rounded-sm  `}
            disabled={idArray.includes(book && book._id) ? true : false}
            onClick={handleAddToWishlist}
          >
            {buttonLoading ? (
              <div className="py-2 px -5border-y-transparent animate-spin border-4 rounded-full border-white"></div>
            ) : idArray.includes(book && book._id) ? (
              <p className="flex gap-2 items-center">
                Added
                <FaCheck />
              </p>
            ) : (
              <p className="text-sm ">Add to wishlist</p>
            )}
          </button>
          {location.pathname.includes("/user/profile") && (
            <button
              onClick={deleteBook}
              className="bg-red-600 text-md p-2 px-6 h-full text-white hover:bg-red-800 rounded-md "
            >
              {deleteButtonLoading ? (
                <div className="py-2 px-2 border-y-transparent animate-spin border-4 rounded-full border-white"></div>
              ) : (
                <p className="flex gap-2 items-center">Delete</p>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;

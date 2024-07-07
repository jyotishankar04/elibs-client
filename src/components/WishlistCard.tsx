import { Link } from "react-router-dom";
import { Book, fetchUser } from "../store/asyncReducres/fetch";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppDispatch } from "../store/hooks.ts";

interface prop {
  book: Book;
}
const WishlistCard: React.FC<prop> = ({ book }) => {
  const dispatch = useAppDispatch();

  const handleRemoveBook = async () => {
    try {
      await axios.delete(
        `https://elibapi.devsuvam.xyz/api/v1/books/wishlist/remove/${book._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(fetchUser());
      toast.success("Book Remove from  wishlist");
    } catch (error) {
      console.error(error);
      toast.error("Error adding book to wishlist");
    }
  };
  return (
    <div className="w-full sm:flex sm:flex-row  grid grid-cols-2 gap-3 lg:text-lg text-sm justify-between items-center bg-slate-100 mt-1 p-3 rounded-md">
      <div className="sm:w-10 aspect-square overflow-hidden">
        <img className="w-full sm:p-0 p-3 rounded-lg" src={book.coverImage} />
      </div>
      <div className="flex w-full sm:text-lg sm:flex-row basis-[80%]  sm:justify-around flex-col text-xs  justify-start gap-1">
        <h1 className=" text-orange-500 ">{book.title}</h1>
        <p>{book.author}</p>
        <p> {book.uploadedBy.name}</p>
      </div>
      <div className="grid grid-cols-2 sm:gap-2 text-center col-span-2   items-center justify-center gap-1  lg:gap-5">
        <Link
          target="_blank"
          to={book.file}
          className="text-white bg-slate-700 py-2 lg:px-8 px-2 rounded-md hover:bg-slate-500 transition-colors duration-100"
        >
          Read
        </Link>

        <button
          onClick={handleRemoveBook}
          className="text-white bg-red-700 py-2 lg:px-8 px-2 rounded-md hover:bg-red-900-500 transition-colors duration-100"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default WishlistCard;

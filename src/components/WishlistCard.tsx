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
    <div className="w-full flex justify-between items-center bg-slate-100 mt-1 p-3 rounded-md">
      <div className="w-10 aspect-square overflow-hidden">
        <img className="w-full" src={book.coverImage} />
      </div>
      <h1>{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>Published By: {book.uploadedBy.name}</p>
      <div className="flex items-center justify-center gap-5">
        <Link
          target="_blank"
          to={book.file}
          className="text-white bg-slate-700 py-2 px-8 rounded-md hover:bg-slate-500 transition-colors duration-100"
        >
          Read
        </Link>

        <button
          onClick={handleRemoveBook}
          className="text-white bg-red-700 py-2 px-4 rounded-md hover:bg-red-900-500 transition-colors duration-100"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default WishlistCard;

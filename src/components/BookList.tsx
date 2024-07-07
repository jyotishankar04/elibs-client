import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchBooks } from "../store/asyncReducres/fetch";
import { RootState } from "../store/store";
import BookCard from "./BookCard";
import { useAppDispatch } from "../store/hooks.ts";

function BookList() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBooks()).unwrap();
  }, [dispatch]);
  const books = useSelector((state: RootState) => state.book.book);

  return (
    <div className="flex flex-col gap-3 my-3 text-gray-500 text-lg md:text-3xl  sm:text-2xl font-semibold ">
      <div>
        <h1 className="text-center text-orange-600 font-serif underline ">
          New Collections
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 ">
        {Array.isArray(books)
          ? books.map((book) => <BookCard key={book._id} book={book} />)
          : "Error in fetching books"}
      </div>
    </div>
  );
}

export default BookList;

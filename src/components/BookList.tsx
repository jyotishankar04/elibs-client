import { useEffect } from "react";
import BookCard from "./BookCard";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../features/books/bookSlice";
import { fetchHomePageBooks } from "../features/books/fetchHomeBooks";

export interface Book {
  _id: string;
  title: string;
  author: string;
  uploadedBy: {
    _id: string;
    name: string;
  };
  genre: string;
  coverImage: string;
  file: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

function BookList() {
  const books = useSelector((state: State) => state.books);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHomePageBooks());
  }, [dispatch]);
  return (
    <div className=" grid grid-cols-3 gap-5 mt-5 mb-5">
      {Array.isArray(books)
        ? books.map((book: Book, index) => <BookCard book={book} key={index} />)
        : ""}
    </div>
  );
}

export default BookList;

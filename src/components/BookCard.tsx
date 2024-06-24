import React from "react";
import { Book } from "./BookList";
import { Card, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { timeElapsedSince } from "../utils/TimeCalculate";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <Link to={`/book/${book._id}`}>
      <Card className="grid h-60 gap-4 grid-cols-2 ">
        <CardHeader className="h-full rounded-lg object-cover object-center overflow-hidden aspect-square">
          <img
            src={book.coverImage}
            className=" rounded-lg h-full "
            alt={book.title}
          />
        </CardHeader>
        <div className="flex flex-col gap-2 h-full py-6 justify-between ">
          <div>
            <h1 className="text-orange-500 text-2xl font-semibold">
              {book.title}
            </h1>
            <p className="line-clamp-2 text-gray-500">{book.description}</p>
            <p className="text-sm">Author: {book.author}</p>
            <p className="text-sm">
              Updated: {timeElapsedSince(book.updatedAt.toString())}
            </p>
          </div>
          <div>
            <Button className="bg-orange-500">Add to Wishlist</Button>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default BookCard;

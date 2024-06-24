import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Book } from "../components/BookList";
import { Button } from "../components/ui/button";
import { DownloadCloud, HeartIcon, StepBackIcon } from "lucide-react";
import { timeElapsedSince } from "../utils/TimeCalculate";

function BookPage() {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [book, setBook] = useState<Book>();
  const fetchCurrentBook = async () => {
    const res = await axios.get(
      `http://localhost:3001/api/v1/books/book/${bookId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setBook(res.data.data[0]);
  };
  console.log(book);

  useEffect(() => {
    fetchCurrentBook();
  }, [bookId]);
  return (
    <div className="container mx-auto mt-1">
      <div>
        <Button className="bg-orange-500" onClick={() => navigate("/")}>
          <StepBackIcon />
        </Button>
      </div>
      <div className="grid grid-cols-2 mt-2">
        <div className="p-4 rounded-lg">
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
            <Button
              className="bg-orange-500 text-white hover:bg-slate-500 flex items-center gap-3"
              variant={"secondary"}
            >
              Add to Wishlist <HeartIcon />
            </Button>
            <Button
              className=" text-white hover:bg-slate-500 flex items-center gap-3"
              variant={"default"}
            >
              <Link to={`${book?.file}`} target="_blank">
                Read & Download
              </Link>
              <DownloadCloud />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookPage;

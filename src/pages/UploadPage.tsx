import { ChangeEventHandler, FormEvent, useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsUploading, State } from "../features/books/bookSlice";
import DrowerLoader from "../components/DrowerLoader";

interface FormData {
  title: string;
  author: string;
  genre: string;
  coverImage: File | null;
  pdf: File | null;
  description: string;
}
function UploadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    title: "book 6",
    author: "me",
    genre: "comedy",
    coverImage: null,
    pdf: null,
    description: "lorem ipsum dolor sit amet",
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleAreaChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setIsUploading(true));
    const form = new FormData();
    form.append("title", formData.title);
    form.append("author", formData.author);
    form.append("genre", formData.genre);
    if (formData.coverImage) form.append("coverImage", formData.coverImage);
    if (formData.pdf) form.append("file", formData.pdf);
    form.append("description", formData.description);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/books/upload",

        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data) {
        if (response.data.id) {
          dispatch(setIsUploading(false));
          navigate(`/book/${response.data.id}`);
        } else {
          alert(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error uploading book:", error);
      alert("An error occurred while uploading the book.");
    }
  };
  return (
    <div className="container mx-auto my-2">
      <Card>
        <CardHeader>
          <CardTitle>Upload Your Book</CardTitle>
          <p className="text-sm text-gray-500">
            Please upload your book in pdf format
          </p>
          <hr />
          <form onSubmit={handleSubmit}>
            <CardContent className="flex flex-col gap-2">
              <div>
                <Label>Book Title</Label>
                <Input
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Book name..."
                ></Input>
              </div>
              <div className="w-full mt-5 grid grid-cols-2 gap-5 ">
                <div>
                  <Label>Author's Name</Label>
                  <Input
                    name="author"
                    type="text"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder=" Jhon Doe ..."
                  ></Input>
                </div>
                <div>
                  <Label>Genre</Label>
                  <Input
                    name="genre"
                    type="text"
                    value={formData.genre}
                    onChange={handleChange}
                    placeholder="Horor...."
                  ></Input>
                </div>
                <div>
                  <Label>Upload cover Picture</Label>
                  <Input
                    type="file"
                    name="coverImage"
                    onChange={handleChange}
                    accept=".jpg, .jpeg, .png"
                  ></Input>
                </div>

                <div>
                  <Label>Upload book pdf (10mb)</Label>
                  <Input
                    name="pdf"
                    type="file"
                    onChange={handleChange}
                    accept="application/pdf"
                  ></Input>
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  name="description"
                  onChange={handleAreaChange}
                  className="max-h-40 min-h-40"
                  placeholder="About this book ..."
                ></Textarea>
                <Button className="mt-4 w-full" type="submit">
                  Upload Book
                </Button>
              </div>
            </CardContent>
          </form>
        </CardHeader>
      </Card>
      <DrowerLoader />
    </div>
  );
}

export default UploadPage;

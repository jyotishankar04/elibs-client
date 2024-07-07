import axios from "axios";
import { ChangeEventHandler, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { endDrowerLoader, startDrowerLoader } from "../store/Slice/utilSlice";
import toast from "react-hot-toast";
import Input from "../components/Input";

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
    title: "",
    author: "",
    genre: "",
    coverImage: null,
    pdf: null,
    description: "",
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
    dispatch(startDrowerLoader());
    const form = new FormData();
    form.append("title", formData.title);
    form.append("author", formData.author);
    form.append("genre", formData.genre);
    if (formData.coverImage) form.append("coverImage", formData.coverImage);
    if (formData.pdf) form.append("file", formData.pdf);
    form.append("description", formData.description);

    try {
      const response = await axios.post(
        `https://elibapi.devsuvam.xyz/api/v1/books/upload`,

        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data) {
        if (response.data.id) {
          dispatch(endDrowerLoader());
          toast.success("Book successfully uploaded");
          navigate(`/book/${response.data.id}`);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      dispatch(endDrowerLoader());
      console.error("Error uploading book:", error);
      toast.error("An error occurred while uploading the book.");
    }
  };
  return (
    <div className="container mx-auto my-2">
      <div>
        <div>
          <h1 className="text-xl ml-4 sm:text-3xl">Upload Your Book</h1>
          <p className="text-sm ml-4 text-red-600">
            Please upload your book in pdf format
          </p>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 sm:p-1 p-5">
              <div>
                <Input
                  label="Book Title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Book name..."
                ></Input>
              </div>
              <div className="w-full sm:mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5 ">
                <div>
                  <Input
                    label="Author's Name"
                    name="author"
                    type="text"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder=" Jhon Doe ..."
                  ></Input>
                </div>
                <div>
                  <Input
                    label="Genre"
                    name="genre"
                    type="text"
                    value={formData.genre}
                    onChange={handleChange}
                    placeholder="Horor...."
                  ></Input>
                </div>
                <div>
                  <label
                    htmlFor=""
                    className=" text-gray-800 text-sm font-semibold"
                  >
                    Upload Cover Picture
                  </label>
                  <input
                    className="text-gray-900 border bg-transparent p-2 w-full rounded-lg focus-within:ring-2 ring-gray-400  outline-none
             ring-1
            focus-within:ring-black 
            "
                    type="file"
                    name="coverImage"
                    onChange={handleChange}
                    accept=".jpg, .jpeg, .png"
                  ></input>
                </div>

                <div>
                  <label
                    htmlFor=""
                    className="text-gray-800 text-sm font-semibold"
                  >
                    Upload Book PDF{" "}
                    <span className="text-red-600">*size &lt; 10mb*</span>
                  </label>

                  <input
                    className="text-gray-900 border bg-transparent p-2 w-full rounded-lg focus-within:ring-2 ring-gray-400  outline-none
             ring-1
            focus-within:ring-black 
            "
                    name="pdf"
                    type="file"
                    onChange={handleChange}
                    accept="application/pdf"
                  ></input>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-800 text-sm font-semibold">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleAreaChange}
                  className="text-gray-900 border bg-transparent p-2 w-full rounded-lg focus-within:ring-2 ring-gray-400  outline-none
             ring-1
            focus-within:ring-black max-h-[150px] min-h-[150px]
            "
                  placeholder="About this book ..."
                ></textarea>
              </div>
              <button
                className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-orange-400"
                type="submit"
              >
                Upload Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;

import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { setIsUploading, State } from "../features/books/bookSlice";
import { Button } from "../components/ui/button";
import { ChangeEventHandler, useState } from "react";
import { FileEditIcon } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import DrowerLoader from "../components/DrowerLoader";
import { getProfileDetails } from "../features/books/fetchHomeBooks";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../components/ui/input";

function Setting() {
  const user = useSelector((state: State) => state.userInfo);
  const [image, setImage] = useState<string>(user.profileImage);
  const [file, setFile] = useState<File>();
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      setImage(URL.createObjectURL(file));
    }
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = new FormData();
  const handlesubmit: ChangeEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.custom(
        <h1 className="bg-orange-500 text-white px-4 py-2 rounded-lg">
          {" "}
          Please select an image
        </h1>
      );
      return;
    }
    dispatch(setIsUploading(true));
    if (file) form.append("profileImage", file);

    try {
      const res = await axios.put(
        "http://localhost:3001/api/v1/users/profile/update-image",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!res) {
        toast.error("Error in updating image");
      }
    } catch (error) {
      dispatch(setIsUploading(false));
      toast.error("Error image uploading");
      return;
    }
    dispatch(setIsUploading(false));
    toast.success("Image updated successfully");
    dispatch(getProfileDetails());
    toast.success("You will able to see profile details in few seconds");
    await new Promise(() => setTimeout(() => {}, 5000));
    navigate("/user/profile");
  };

  // General settings part
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    email: "",
    instagramUrl: "",
    linkedinUrl: "",
    twitterUrl: "",
    date: "",
  });
  const handleChangeData: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };
  const handleDataSubmit: ChangeEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      dispatch(setIsUploading(true));
      const res = await axios.put(
        "http://localhost:3001/api/v1/users/profile/update-data",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!res) {
        dispatch(setIsUploading(false));
        toast.error("Error in updating data");
        return;
      }
      dispatch(getProfileDetails());
      dispatch(setIsUploading(false));
      toast.success("Profile updated successfully");
      setFormData({
        name: "",
        bio: "",
        email: "",
        instagramUrl: "",
        linkedinUrl: "",
        twitterUrl: "",
        date: "",
      });
      dispatch(getProfileDetails());
    } catch (error) {
      dispatch(setIsUploading(false));
      toast.error("Error in updating data");
      return;
    }
  };

  return (
    <div>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] container flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full grid-cols-[250px_1fr]">
          <nav
            className="grid gap-4 text-sm text-muted-foreground h-fit"
            x-chunk="dashboard-04-chunk-0"
          >
            <Link
              to="/setting"
              className="font-semibold text-primary rounded-md bg-gray-100 w-10/12 p-2"
            >
              General
            </Link>
            <Link
              to="/setting/security"
              className=" text-primary rounded-md  w-10/12 p-2"
            >
              Security
            </Link>
            <Link
              className="text-primary rounded-md  w-10/12 p-2"
              to="/setting/support"
            >
              Support
            </Link>
          </nav>
          <Card className="p-2">
            <CardHeader>
              <CardTitle>Upload your profile picture</CardTitle>
              <form
                onSubmit={handlesubmit}
                className="flex justify-center flex-col items-center gap-5"
              >
                <div className="w-52 rounded-full relative overflow-hidden h-52 flex items-center justify-center">
                  <img
                    src={image}
                    alt=""
                    className="object-center object-cover"
                  />
                </div>
                <div className="w-60 relative flex justify-center items-center cursor-pointer hover:bg-gray-400 h-12 outline-dashed text-gray-700 rounded-lg ">
                  <input
                    type="file"
                    accept="image/*"
                    name="profileImage"
                    id="profileImage"
                    onChange={handleChange}
                    className="w-full absolute opacity-0 h-full cursor-pointer text-2xl"
                  />
                  Click to upload image
                  <FileEditIcon className="text-2xl cursor-pointer" />
                </div>
                <Button type="submit">Upload</Button>
              </form>
            </CardHeader>
            <CardContent>
              <CardTitle>General Settings</CardTitle>
              <form
                action=""
                onSubmit={handleDataSubmit}
                className="flex flex-col gap-3"
              >
                <div className="flex flex-col gap-2">
                  <Label>Name</Label>
                  <Input
                    value={formData.name}
                    placeholder="Jhon Doe"
                    onChange={handleChangeData}
                    name="name"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Bio</Label>
                  <Input
                    value={formData.bio}
                    placeholder="Hey i am using CodersBook"
                    onChange={handleChangeData}
                    name="bio"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Email</Label>
                  <Input
                    value={formData.email}
                    placeholder="jhondoe@yahoo.com"
                    onChange={handleChangeData}
                    name="email"
                  />
                </div>
                <CardTitle>Social Links</CardTitle>
                <div className={`flex flex-col gap-2`}>
                  <Label>Instagram Profile Url</Label>
                  <Input
                    value={formData.instagramUrl}
                    placeholder="https://instagram.com/jhondoe04"
                    onChange={handleChangeData}
                    name="instagramUrl"
                  />
                </div>
                <div className={`flex flex-col gap-2`}>
                  <Label>Linkedin Profile Url</Label>
                  <Input
                    value={formData.linkedinUrl}
                    placeholder="https://linkedin.com/in/jhon-doe"
                    onChange={handleChangeData}
                    name="linkedinUrl"
                  />
                </div>
                <div className={`flex flex-col gap-2`}>
                  <Label>Twitter Profile Url</Label>
                  <Input
                    value={formData.twitterUrl}
                    placeholder="https://x.com/jhondoe04"
                    onChange={handleChangeData}
                    name="twitterUrl"
                  />
                </div>
                <div>
                  <Label>Enter DOB</Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={handleChangeData}
                    name="date"
                  />
                </div>
                <Button type="submit">Update Profile</Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <DrowerLoader />
        <Toaster></Toaster>
      </main>
    </div>
  );
}

export default Setting;

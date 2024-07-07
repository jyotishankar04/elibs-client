import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useAppDispatch } from "../store/hooks.ts";

import { ChangeEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { endDrowerLoader, startDrowerLoader } from "../store/Slice/utilSlice";
import { FaEdit } from "react-icons/fa";
import Input from "../components/Input";
import { fetchUser } from "../store/asyncReducres/fetch";
function GeneralSettings() {
  const user = useSelector((state: RootState) => state.user);
  const [image, setImage] = useState<string>(user.profileImage);
  const [file, setFile] = useState<File>();
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      setImage(URL.createObjectURL(file));
    }
  };
  const dispatch = useAppDispatch();
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
    dispatch(startDrowerLoader());
    if (file) form.append("profileImage", file);

    try {
      const res = await axios.put(
        `https://elibapi.devsuvam.xyz/api/v1/users/profile/update-image`,
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
      dispatch(endDrowerLoader());
      toast.error("Error image uploading");
      return;
    }
    dispatch(startDrowerLoader());
    toast.success("Image updated successfully");
    dispatch(endDrowerLoader());
    toast.success("You will able to see profile details in few seconds");
    await new Promise(() => setTimeout(() => {}, 5000));
    navigate("/user/profile");
  };
  // General settings
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
      dispatch(startDrowerLoader());
      const res = await axios.put(
        `https://elibapi.devsuvam.xyz/api/v1/users/profile/update-data`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!res) {
        dispatch(endDrowerLoader());
        toast.error("Error in updating data");
        return;
      }
      dispatch(fetchUser());
      dispatch(endDrowerLoader());
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
    } catch (error) {
      dispatch(endDrowerLoader());
      toast.error("Error in updating data");
      return;
    }
  };

  return (
    <div>
      <h1 className="sm:text-2xl mb-5 text-xl text-gray-600 font-semibold">
        General Settings
      </h1>
      <div>
        <form
          onSubmit={handlesubmit}
          className="flex justify-center flex-col items-center gap-5"
        >
          <div className="w-52 rounded-full relative overflow-hidden h-52 flex items-center justify-center">
            <img src={image} alt="" className="object-center object-cover" />
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
            <FaEdit className="text-2xl cursor-pointer" />
          </div>
          <button
            className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-orange-400"
            type="submit"
          >
            Upload
          </button>
        </form>
        <form
          action=""
          onSubmit={handleDataSubmit}
          className="flex flex-col gap-3"
        >
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              value={formData.name}
              placeholder="Jhon Doe"
              onChange={handleChangeData}
              name="name"
              label="Name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Input
              label="Bio"
              type="text"
              value={formData.bio}
              placeholder="Hey i am using CodersBook"
              onChange={handleChangeData}
              name="bio"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Input
              type="text"
              label="Email"
              value={formData.email}
              placeholder="jhondoe@yahoo.com"
              onChange={handleChangeData}
              name="email"
            />
          </div>
          <h1>Social Links</h1>
          <div className={`flex flex-col gap-2`}>
            <Input
              type="texts"
              label="Instagram Profile Url"
              value={formData.instagramUrl}
              placeholder="https://instagram.com/jhondoe04"
              onChange={handleChangeData}
              name="instagramUrl"
            />
          </div>
          <div className={`flex flex-col gap-2`}>
            <Input
              type="text"
              label="Linkedin Profile Url"
              value={formData.linkedinUrl}
              placeholder="https://linkedin.com/in/jhon-doe"
              onChange={handleChangeData}
              name="linkedinUrl"
            />
          </div>
          <div className={`flex flex-col gap-2`}>
            <label></label>
            <Input
              label="Twitter Profile Url"
              type="text"
              value={formData.twitterUrl}
              placeholder="https://x.com/jhondoe04"
              onChange={handleChangeData}
              name="twitterUrl"
            />
          </div>
          <button
            className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-orange-400"
            type="submit"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default GeneralSettings;

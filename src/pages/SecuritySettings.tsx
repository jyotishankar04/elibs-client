import { ChangeEventHandler, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { endDrowerLoader, startDrowerLoader } from "../store/Slice/utilSlice";
import axios from "axios";
import Input from "../components/Input";
interface fromData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
function SecuritySettings() {
  const [formData, setFormData] = useState<fromData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isMatch, setIsMatch] = useState(true);
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    if (
      e.target.name == "confirmPassword" &&
      e.target.value == formData.newPassword
    ) {
      setIsMatch(true);
    } else {
      setIsMatch(false);
    }
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };
  const dispatch = useDispatch();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isMatch) {
      toast.error("Password dont match", {
        duration: 1000,
      });
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters", {
        duration: 1000,
      });
      return;
    }
    try {
      dispatch(startDrowerLoader());
      const res = await axios.patch(
        `http://ec2-13-202-141-182.ap-south-1.compute.amazonaws.com/api/v1/users/update-password`,
        {
          oldPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res) {
        toast.success(res.data.message, {
          duration: 2000,
        });
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
      dispatch(endDrowerLoader());
      return toast.error("Error updating", {
        duration: 1000,
      });
    } catch (error) {
      dispatch(endDrowerLoader());

      toast.error("Error updating", {
        duration: 1000,
      });
    }
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div className=" flex flex-col gap-5">
          <h1 className="text-2xl font-semibold text-gray-600">
            Change Password
          </h1>
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              label="Current Password"
              placeholder="Current Password"
              value={formData.currentPassword}
              onChange={handleChange}
              name="currentPassword"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Input
              type="text"
              label="New Password"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              name="newPassword"
            />
          </div>
          <div
            className={`${
              isMatch
                ? "focus-visible:ring-gray-900 text-gray-900"
                : " focus-visible:ring-red-800 text-red-600"
            }flex flex-col gap-2`}
          >
            <Input
              type="text"
              label="Repeat New Password"
              placeholder="Repeat Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
            />
          </div>
          <button
            className={`w-full mt-4 bg-slate-700 text-white py-3 rounded-md focus:outline-none transition-colors hover:bg-slate-500/90 ${
              isMatch ? "" : "opacity-50 cursor-not-allowed"
            }`}
            type="submit"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default SecuritySettings;

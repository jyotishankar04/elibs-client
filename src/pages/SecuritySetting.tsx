import { Link } from "react-router-dom";
import { Card, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { ChangeEventHandler, FormEvent, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { timeEnd } from "console";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setIsUploading, State } from "../features/books/bookSlice";
import DrowerLoader from "../components/DrowerLoader";
interface fromData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

function SecuritySetting() {
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
      dispatch(setIsUploading(true));
      const res = await axios.patch(
        "http://localhost:3001/api/v1/users/update-password",
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
      dispatch(setIsUploading(false));
      return toast.error("Error updating", {
        duration: 1000,
      });
    } catch (error) {
      dispatch(setIsUploading(false));

      toast.error("Error updating", {
        duration: 1000,
      });
    }
  };

  return (
    <div>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] container flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full  grid-cols-[250px_1fr]">
          <nav
            className="grid gap-4 text-sm h-fit text-muted-foreground"
            x-chunk="dashboard-04-chunk-0"
          >
            <Link
              to="/setting"
              className=" text-primary rounded-md  w-10/12 p-2"
            >
              General
            </Link>
            <Link
              to="/setting/security"
              className="font-semibold bg-gray-100 text-primary rounded-md  w-10/12 p-2"
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
          <form action="" onSubmit={handleSubmit}>
            <Card className="p-10 flex flex-col gap-5">
              <CardTitle>Change Password</CardTitle>
              <div className="flex flex-col gap-2">
                <Label>Current Password</Label>
                <Input
                  placeholder="Current Password"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  name="currentPassword"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>New Password</Label>
                <Input
                  placeholder="New Password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  name="newPassword"
                />
              </div>
              <div className={`flex flex-col gap-2`}>
                <Label>Repeat New Password</Label>
                <Input
                  placeholder="Repeat Password"
                  className={`${
                    isMatch
                      ? "focus-visible:ring-gray-900 text-gray-900"
                      : " focus-visible:ring-red-800 text-red-600"
                  }`}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  name="confirmPassword"
                />
              </div>
              <Button type="submit">Update Password</Button>
            </Card>
          </form>
        </div>
      </main>
      <div>
        <Toaster />
        <DrowerLoader />
      </div>
    </div>
  );
}

export default SecuritySetting;

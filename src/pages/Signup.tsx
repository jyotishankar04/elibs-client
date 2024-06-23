import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
interface Signup {
  name: string;
  email: string;
  password: string;
}
function Signup() {
  const { sign } = useParams();
  const [defaultValue, setDefaultValue] = useState("signup");
  const [signupData, setSignupData] = useState<Signup>({
    name: "",
    email: "",
    password: "",
  });
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (sign == "signin") {
      setDefaultValue("signin");
    } else if (sign == "signup") {
      setDefaultValue("signup");
    }
    if (sign != ("signup" || "signin")) {
      navigate("/auth/signup");
    }
  }, [sign]);
  console.log(defaultValue);

  const handleSignup = async () => {
    const res = await fetch("http://localhost:3001/api/v1/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    });
    const data = await res.json();
    localStorage.setItem("token", data.accessToken);
    if (localStorage.getItem("token")) {
      setSignupData({
        name: "",
        email: "",
        password: "",
      });
      navigate("/");
    }
  };

  const handleSignin = async () => {
    const res = await fetch("http://localhost:3001/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signinData),
    });
    const data = await res.json();
    localStorage.setItem("token", data.accessToken);
    if (localStorage.getItem("token")) {
      setSigninData({
        email: "",
        password: "",
      });
      navigate("/");
    } else {
      toast.warning("Error in login");
    }
  };
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ToastContainer />
      <Tabs defaultValue={defaultValue} className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
          <TabsTrigger value="signin">Sign In</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Sign Up</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Jhon Doe"
                  onChange={(e) =>
                    setSignupData((data) => ({ ...data, name: e.target.value }))
                  }
                  value={signupData.name}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(e) =>
                    setSignupData((data) => ({
                      ...data,
                      email: e.target.value,
                    }))
                  }
                  value={signupData.email}
                  id="email"
                  placeholder="JhonDoe@gmail.com"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData((data) => ({
                      ...data,
                      password: e.target.value,
                    }))
                  }
                  id="password"
                  placeholder="******"
                  type="password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-center w-full">
                <Button onClick={handleSignup}>Create Account</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="signin">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Login</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  onChange={(e) =>
                    setSigninData((data) => ({
                      ...data,
                      email: e.target.value,
                    }))
                  }
                  value={signinData.email}
                  placeholder="JhonDoe@gmail.com"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  onChange={(e) =>
                    setSigninData((data) => ({
                      ...data,
                      password: e.target.value,
                    }))
                  }
                  value={signinData.password}
                  placeholder="******"
                  type="password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="mx-auto" onClick={handleSignin}>
                Login
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Signup;

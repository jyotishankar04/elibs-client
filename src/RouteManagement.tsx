import { Route, Routes } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import BookLauout from "./layouts/BookLauout";
import Profile from "./pages/Profile";
import UserLayout from "./layouts/UserLayout";
import BookDetailsPage from "./pages/BookDetailsPage";
import SettingsLayout from "./layouts/SettingsLayout";
import GeneralSettings from "./pages/GeneralSettings";
import SupportSetting from "./pages/SupportSetting";
import SecuritySettings from "./pages/SecuritySettings";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/Home";
import UserProfilePage from "./pages/UserProfilePage";
import UploadPage from "./pages/UploadPage";

function RouteManagement() {
  return (
    <div>
      <Routes>
        <Route path="auth" element={<AuthLayout />}>
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Signin />} />
        </Route>
        <Route path="/" element={<HomeLayout />}>
          <Route path="" element={<Home />} />
          <Route path="book" element={<BookLauout />}>
            <Route path=":bookId" element={<BookDetailsPage />} />
          </Route>
          <Route path="user" element={<UserLayout />}>
            <Route path="profile" element={<Profile />} />
            <Route path="upload" element={<UploadPage />} />

            <Route path=":userId" element={<UserProfilePage />} />

            <Route path="settings" element={<SettingsLayout />}>
              <Route path="general" element={<GeneralSettings />} />
              <Route path="security" element={<SecuritySettings />} />
              <Route path="support" element={<SupportSetting />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default RouteManagement;

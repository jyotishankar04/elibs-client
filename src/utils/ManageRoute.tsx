import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import BookPage from "../pages/BookPage";
import UploadPage from "../pages/UploadPage";
import Profile from "../pages/Profile";
import Setting from "../pages/Setting";
import Support from "../pages/Support";
import SecuritySetting from "../pages/SecuritySetting";

function ManageRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book/:bookId" element={<BookPage />} />
      <Route path="/auth/:sign" element={<Signup />} />

      <Route path="/book/upload" element={<UploadPage />} />
      <Route path="/user/profile" element={<Profile />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/setting/support" element={<Support />} />
      <Route path="/setting/security" element={<SecuritySetting />} />
    </Routes>
  );
}

export default ManageRoute;

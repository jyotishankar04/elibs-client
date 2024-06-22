import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

function ManageRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book/:bookId" element={<h1>Book</h1>} />
      <Route path="/auth/signup" element={<h1>signup</h1>} />
      <Route path="/auth/signin" element={<h1>signin</h1>} />
    </Routes>
  );
}

export default ManageRoute;

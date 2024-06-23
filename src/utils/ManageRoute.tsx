import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";

function ManageRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book/:bookId" element={<h1>Book</h1>} />
      <Route path="/auth/:sign" element={<Signup />} />
    </Routes>
  );
}

export default ManageRoute;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../views/auth/Login";
import Register from "../views/auth/Regiter";
import Dashboard from "../views/Dashboard";
import Profile from "../views/Profile";

export const RoutesTemplate = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<Dashboard/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesTemplate;
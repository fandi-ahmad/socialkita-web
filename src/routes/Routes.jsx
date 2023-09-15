import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../views/auth/Login";
import Register from "../views/auth/Regiter";
import Dashboard from "../views/Dashboard";
import Profile from "../views/user/Profile";
import EditProfile from "../views/user/EditProfile";
import UserProjectList from "../views/user/UserProjectList";
import AddProject from "../views/project/AddProject";

export const RoutesTemplate = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<Dashboard/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/profile/edit" element={<EditProfile/>} />
        <Route path="/profile/project" element={<UserProjectList/>} />
        <Route path="/project/new" element={<AddProject/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesTemplate;
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../views/Login";
import Dashboard from "../views/Dashboard";
import { GetAllUser } from "../api/userApi";
import { useEffect, useState } from "react";

export const RoutesTemplate = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesTemplate;
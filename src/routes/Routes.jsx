import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../views/Login";
import Dashboard from "../views/Dashboard";

export const RoutesTemplate = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesTemplate
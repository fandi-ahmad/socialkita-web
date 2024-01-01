import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../views/auth/Login";
import Register from "../views/auth/Regiter";
import Dashboard from "../views/Dashboard";
import Profile from "../views/user/Profile";
import EditProfile from "../views/user/EditProfile";
import UserProjectList from "../views/user/UserProjectList";
import AddProject from "../views/project/AddProject";
import DataBook from "../views/DataBook";
import PageNotFound from "../views/PageNotFound";
import AuthenticatedUser from "../middleware/AuthenticatedUser";
import LoginLogoutPage from "../middleware/LoginLogoutPage";
import CheckUsername from "../middleware/CheckUsername";
import CheckUserLogin from "../middleware/CheckUserLogin";
import CheckUsernameSame from "../middleware/CheckUsernameSame";
import RedirectHome from "../views/RedirectHome";

export const RoutesTemplate = () => {

  const authUsernameSame = (route, component) => {
    return (
      <Route 
          path={route} 
          element={
            <AuthenticatedUser 
              page={<CheckUsername 
                page={<CheckUsernameSame 
                  page={component} 
                />} 
              />} 
              pageNotFound={<PageNotFound/>}
            />} 
        />
    )
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<CheckUserLogin page={<Dashboard/>} />} />
        <Route path="/p" element={<RedirectHome/>} />
        
        <Route path="/login" element={<LoginLogoutPage page={<Login/>} />} />
        <Route path="/register" element={<LoginLogoutPage page={<Register/>} />} />

        <Route path="/p/:user" element={<CheckUsername page={<Profile/>} pageNotFound={<PageNotFound/>} />} />
        {authUsernameSame('/p/:user/edit', <EditProfile/>)}
        {authUsernameSame('/p/:user/project', <UserProjectList/>)}
        <Route path="/project/new" element={<AuthenticatedUser page={<CheckUserLogin page={<AddProject/>} />} />} />

        <Route path="/data-book" element={<DataBook/>} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesTemplate;
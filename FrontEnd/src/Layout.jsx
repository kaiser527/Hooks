import { Route, Routes } from "react-router-dom";
import User from "./Components/User/User";
import Admin from "./Components/Admin/Admin";
import HomePage from "./Components/Home/Home";
import ManageUser from "./Components/Admin/Content/ManageUser";
import DashBoard from "./Components/Admin/Content/DashBoard";
import Login from "./Components/Auth/Login";
import App from "./App";
import Register from "./Components/Auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Layout = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/users" element={<User />} />
        </Route>
        <Route path="/admins" element={<Admin />}>
          <Route index element={<DashBoard />} />
          <Route path="manage-users" element={<ManageUser />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Layout;

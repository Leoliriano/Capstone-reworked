import { useEffect } from "react";

import Header from "../src/components/Header";
import Shop from "./pages/Shop";
import PageNotFound from "./pages/PageNotFound";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Success from "./pages/Success";

import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { getExisitingUserDataUrl, headers } from "../utils/urls";
import {
  Login as LoginAction,
  Logout as LogoutAction,
} from "./store/userSlice";

const App = () => {
  const cookie = Cookies.get("access_token");
  console.log(cookie);
  const dispatch = useDispatch();
  useEffect(() => {
    const pullUserData = () => {
      fetch(getExisitingUserDataUrl, {
        method: "GET",
        headers: headers,
        credentials: "include",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          data.success == true && dispatch(LoginAction(data.data));
          data.success == false && dispatch(LogoutAction());
        });
    };
    cookie && pullUserData();
  }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:productid" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};
export default App;

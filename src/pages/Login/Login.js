import { useState, useEffect } from "react";
import useGlobalcontext from "../../Helper/AppProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const { clearInput, usersURI, Info, setnewUser, newUser, hasLoggedIn } =
    useGlobalcontext();
  const [label, setLabel] = useState("ShopOnClick");
  const nav = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLabel("ShopOnClick");
    }, 1500);
    return () => clearTimeout(timer);
  }, [label]);

  useEffect(() => {
    clearInput();
  }, [newUser]);

  const login = async () => {
    try {
      if (newUser) {
        setnewUser(false);
      } else {
        await axios.post(usersURI + "/login", Info);
        nav("/");
        hasLoggedIn();
      }
    } catch (err) {
      setLabel(err.response.data.msg);
    }
  };

  const register = async () => {
    try {
      if (newUser) {
        const { data } = await axios.post(usersURI + "/register", Info);
        setLabel(data.msg);
      } else {
        setnewUser(true);
      }
    } catch (err) {
      setLabel(err.response.data.msg);
    }
  };
  return { register, login, clearInput, newUser, label };
}

export default Login;

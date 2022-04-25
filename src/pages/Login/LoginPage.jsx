import React from "react";
import Input from "../../Components/Input";
import Password from "../../Components/Password";
import "./Login.css";
import { FaArrowLeft, FaRedoAlt } from "react-icons/fa";
import Login from "./Login";

function LoginPage() {
  const { newUser, label, login, register, clearInput } = Login();

  return (
    <div className="login-page">
      <h3 className="headings">{label}</h3>
      {newUser && <Input info={"username"} />}
      <Input info={"email"} />
      <Password info={"password"} />
      {newUser && <Password info={"verify"} />}
      <div className="login-btn">
        {newUser ? (
          <button onClick={() => login()}>
            <FaArrowLeft />
          </button>
        ) : (
          <button onClick={() => login()}>Login</button>
        )}
        <button onClick={() => register()}>Register</button>
        <button onClick={() => clearInput()}>
          <FaRedoAlt />
        </button>
      </div>
    </div>
  );
}

export default LoginPage;

import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useGlobalcontext from "../Helper/AppProvider";

function Password({ info }) {
  const [PasswordVisibility, setPasswordVisibility] = useState(false);
  const [label, setLabel] = useState("");
  const { Info, setInfo, newUser } = useGlobalcontext();
  const { password } = Info;

  useEffect(() => {
    if (password.length < 8 && password) {
      setLabel("weak");
    } else if (!password) {
      setLabel("");
    } else {
      setLabel("good");
    }
    const timer = setTimeout(() => {
      setLabel("");
    }, 1500);

    return () => clearTimeout(timer);
  }, [Info.password]);

  useEffect(() => {
    setPasswordVisibility(false);
  }, [newUser]);

  return (
    <div className="input-field">
      <input
        type={PasswordVisibility ? "text" : "password"}
        value={Info[info]}
        onChange={(e) => setInfo({ ...Info, [info]: e.target.value })}
        placeholder={info}
      />
      <div className="password-icon">
        {PasswordVisibility ? (
          <FaEye onClick={() => setPasswordVisibility(false)} />
        ) : (
          <FaEyeSlash onClick={() => setPasswordVisibility(true)} />
        )}
      </div>
      {newUser && (
        <div className="password-label">
          {info == "password" && (
            <p style={{ color: `${label == "good" ? "green" : "red"}` }}>
              {label && label + " password!"}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Password;

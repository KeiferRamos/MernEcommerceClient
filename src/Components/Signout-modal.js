import React from "react";
import axios from "axios";
import useGlobalcontext from "../Helper/AppProvider";
import "../Styles/Signout.css";

function SignoutModal() {
  const { usersURI, setInfo, Info } = useGlobalcontext();
  const Signout = async () => {
    await axios.post(usersURI + "/logout");
    window.location.reload();
  };

  return (
    <div className="signout-modal">
      <div>
        <p>are you sure you want to sign-out?</p>
        <button onClick={() => Signout()}>Yes</button>
        <button onClick={() => setInfo({ ...Info, signingOut: false })}>
          No
        </button>
      </div>
    </div>
  );
}

export default SignoutModal;

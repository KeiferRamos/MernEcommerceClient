import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalcontext from "../Helper/AppProvider";

function Link({ icon, name, path }) {
  const { Info, setInfo } = useGlobalcontext();
  const [width, setwidth] = useState(window.innerWidth);
  const nav = useNavigate();

  useEffect(() => {
    const getWidth = () => setwidth(window.innerWidth);

    window.addEventListener("resize", getWidth);
    return () => window.removeEventListener("resize", getWidth);
  }, [width]);

  const EventHandler = () => {
    if (name == "SIGN-OUT") {
      setInfo({ ...Info, signingOut: true });
    } else {
      nav(`/MernStackEcommerce${path}`);
    }
  };

  return (
    <p className="nav-link" onClick={() => EventHandler()}>
      {width >= 800 ? name : icon}
    </p>
  );
}

export default Link;

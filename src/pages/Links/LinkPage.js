import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalContext from "../../Helper/AppProvider";

function LinkPage() {
  const [scrollY, setScrollY] = useState(0);
  const nav = useNavigate();
  const [closedSidebar, showSidebar] = useState(true);
  const { setquery, setInfo, Info } = useGlobalContext();
  const path = window.location.pathname;

  useEffect(() => {
    const getHeight = () => setScrollY(window.pageYOffset);

    window.addEventListener("scroll", getHeight);
    return () => window.removeEventListener("scroll", getHeight);
  }, [scrollY]);

  const navigate = (route) => {
    nav(`${route}`);
    setquery({});
  };

  return { navigate, path, showSidebar, closedSidebar };
}

export default LinkPage;

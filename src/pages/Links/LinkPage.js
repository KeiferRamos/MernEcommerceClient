import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { FiSearch, FiArrowUp } from "react-icons/fi";
import useGlobalcontext from "../../Helper/AppProvider";
import { useNavigate } from "react-router-dom";
import "./Link.css";
import Link from "../../Components/link";
import { links } from "../../Data";
import Routes from "../../routes/Routes";
import Sidebar from "../../Components/Sidebar";

function LinkPage() {
  const [scrollY, setScrollY] = useState(0);
  const nav = useNavigate();
  const { setquery, showSidebar } = useGlobalcontext();
  const path = window.location.pathname;

  useEffect(() => {
    const getHeight = () => setScrollY(window.pageYOffset);

    window.addEventListener("scroll", getHeight);
    return () => window.removeEventListener("scroll", getHeight);
  }, [scrollY]);

  const navigate = (route) => {
    nav(`/MernStackEcommerce${route}`);
    setquery({});
  };

  return (
    <div className="wrapper">
      <nav className="navigation">
        <div className={`${scrollY > 200 && "hide"} header`}>
          <p className="logo">ShopOnClick</p>
          <div className="search-field">
            <input
              readOnly
              placeholder="e.g. earphone"
              onClick={() => navigate("/MernStackEcommerce/search")}
            />
            <FiSearch />
          </div>
          {links.map((link) => (
            <div className={path == link.path ? "onlink" : ""} key={link.id}>
              <Link {...link} />
            </div>
          ))}
          <FaBars className="bars" onClick={() => showSidebar(false)} />
        </div>
      </nav>
      <Sidebar />
      <Routes />
      <FiArrowUp
        className={`${scrollY > 200 && "show"} arrow-up`}
        onClick={() => window.scrollTo(0, 0)}
      />
    </div>
  );
}

export default LinkPage;

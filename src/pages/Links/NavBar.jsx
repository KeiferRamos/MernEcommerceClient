import React from "react";
import { FaBars } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import Link from "../../Components/link";
import { links } from "../../Data";

function NavBar({ navigate, scrollY, showSidebar }) {
  const path = window.location.pathname;
  return (
    <nav className="navigation">
      <div className={`${scrollY > 200 && "hide"} header`}>
        <p className="logo">ShopOnClick</p>
        <div className="search-field">
          <input
            readOnly
            placeholder="e.g. earphone"
            onClick={() => navigate("/search")}
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
  );
}

export default NavBar;

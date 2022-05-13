import React from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import useGlobalContext from "../../Helper/AppProvider";

function Sidebar({ showSidebar, closedSidebar }) {
  const { setInfo, Info } = useGlobalContext();
  const nav = useNavigate();
  const navigateUser = (path) => {
    nav(path);
    showSidebar(true);
  };

  return (
    <div className={`${!closedSidebar && "open"} sidebar`}>
      <FaTimes className="close-tab" onClick={() => showSidebar(true)} />
      <div className="links" onClick={() => navigateUser("/products")}>
        <FaShoppingCart />
        <p>Products</p>
      </div>
      <div className="links" onClick={() => navigateUser("/")}>
        <FiSettings />
        <p onClick={() => setInfo({ ...Info, signingOut: true })}>Signout</p>
      </div>
    </div>
  );
}

export default Sidebar;

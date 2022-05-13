import React from "react";
import LinkPage from "./LinkPage";
import Routes from "../../routes/Routes";
import Sidebar from "./Sidebar";
import { FiArrowUp } from "react-icons/fi";
import "./NavPage.css";
import NavBar from "./NavBar";

function NavPage() {
  const { scrollY, showSidebar, closedSidebar, navigate } = LinkPage();

  return (
    <div className="wrapper">
      <NavBar navigate={navigate} scrollY={scrollY} showSidebar={showSidebar} />
      <Sidebar showSidebar={showSidebar} closedSidebar={closedSidebar} />
      <Routes />
      <FiArrowUp
        className={`${scrollY > 200 && "show"} arrow-up`}
        onClick={() => window.scrollTo(0, 0)}
      />
    </div>
  );
}

export default NavPage;

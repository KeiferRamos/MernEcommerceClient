import React from "react";
import "../Styles/loading.css";

function Loading() {
  return (
    <div className="loading-screen">
      <div>
        <div className="spinner"></div>
        <p>loading please wait...</p>
      </div>
    </div>
  );
}

export default Loading;

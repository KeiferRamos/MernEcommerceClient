import React from "react";

function Specs({ Battery, Camera, Chipset, Memory, Software }) {
  return (
    <div className="specs">
      <p>Camera: {Chipset}</p>
      <p>Memory: {Memory}</p>
      <p>Camera: {Camera}</p>
      <p>Battery: {Battery}</p>
      <p>Software: {Software}</p>
    </div>
  );
}

export default Specs;

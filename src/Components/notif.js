import axios from "axios";
import React, { useState } from "react";
import useGlobalcontext from "../Helper/AppProvider";

function Notif({ text, createdAt, orderDetails, _id, customerID, getNotif }) {
  const { usersURI } = useGlobalcontext();
  const date = createdAt.substring(0, createdAt.indexOf("T"));
  const [showDetails, setShowDetails] = useState(false);
  const { ItemPrice, ShippingFee, TotalPrice, itemQuantity } = orderDetails;

  const removeNotif = async () => {
    await axios.patch(usersURI + "/order", { id: _id, customerID });
    getNotif();
  };

  return (
    <div>
      <p>{text}</p>
      <p>{date}</p>
      {showDetails && (
        <div>
          <p>item price: {ItemPrice}</p>
          <p>shipping fee: {ShippingFee}</p>
          <p>Total price: {TotalPrice}</p>
          <p>item quantity: {itemQuantity}</p>
        </div>
      )}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "hide details" : "show details"}
      </button>
      <button onClick={() => removeNotif()}>Recieved</button>
    </div>
  );
}

export default Notif;

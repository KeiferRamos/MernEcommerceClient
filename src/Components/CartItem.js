import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import useGlobalcontext from "../Helper/AppProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CartItem({ item, quantity, _id, color, getTotal, getallItem }) {
  const { usersURI } = useGlobalcontext();
  const [count, setcount] = useState(quantity);
  const { brand, img, name, price } = item;
  const nav = useNavigate();

  useEffect(() => {
    setcount(quantity);
  }, [quantity]);

  const updateQuantity = async (selected) => {
    await axios.patch(usersURI + "/cart", {
      selected,
      count,
      id: _id,
    });
    getTotal();
    getallItem();
  };

  const removeItem = async () => {
    await axios.patch(usersURI + "/cart", {
      selected: "dec",
      count: 1,
      id: _id,
    });
    getTotal();
    getallItem();
  };

  return (
    <div className="cart-container">
      <img
        src={img}
        alt="product image"
        onClick={() => nav(`/products/${name}`)}
      />
      <div className="info-cart">
        <div className="cart-info">
          <h3>{brand}</h3>
          <p>{name}</p>
        </div>
        <div className="cart-price">
          <p>₱ {(price * count).toFixed(2)}</p>
          <div className="cart-quantity">
            <FiChevronLeft onClick={() => updateQuantity("dec")} />
            <p>{count}</p>
            <FiChevronRight onClick={() => updateQuantity("inc")} />
          </div>
        </div>
        <div className="chosen-color">
          <p>selected color: </p>
          <div className="color" style={{ background: color }}></div>
          <p>{color}</p>
          <button className="remove-btn" onClick={() => removeItem()}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;

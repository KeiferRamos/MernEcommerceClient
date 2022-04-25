import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Product.css";

function Product({ name, price, img, brand }) {
  const nav = useNavigate();
  return (
    <div className="product" onClick={() => nav(`/products/${name}`)}>
      <img src={img} alt="product image" />
      <div className="info">
        <p>{name}</p>
        <p className="brand">{brand}</p>
        <p>₱ {price}</p>
      </div>
    </div>
  );
}

export default Product;

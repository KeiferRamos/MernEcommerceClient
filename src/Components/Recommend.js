import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowUpLeft } from "react-icons/fi";
import useGlobalcontext from "../Helper/AppProvider";

function Recommend({ product, BrandRef, classRef }) {
  const [text, setText] = useState(product);
  const nav = useNavigate();
  const { setSearchText, setquery, query } = useGlobalcontext();

  const updateSearchText = () => {
    setSearchText(product);
  };

  const navigateUser = async () => {
    if (BrandRef.includes(text) || classRef.includes(text)) {
      if (BrandRef.includes(text)) {
        setquery({ ...query, brand: text });
      } else if (classRef.includes(text)) {
        setquery({ ...query, category: text });
      }
      nav("/products");
    } else {
      nav(`/products/${text}`);
    }
    setSearchText("");
  };

  return (
    <div className="recommended">
      <p onClick={() => navigateUser()}>{product}</p>
      <FiArrowUpLeft onClick={() => updateSearchText()} />
    </div>
  );
}

export default Recommend;

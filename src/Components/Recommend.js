import React from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowUpLeft } from "react-icons/fi";
import useGlobalcontext from "../Helper/AppProvider";
import axios from "axios";

function Recommend({ product }) {
  const textRef = useRef(null);
  const nav = useNavigate();
  const [BrandRef, setBrandreference] = useState([]);
  const [classRef, setclassReference] = useState([]);
  const { setSearchText, productURI, setquery } = useGlobalcontext();

  const getReference = async () => {
    const { data } = await axios.get(productURI);
    const Brand = data.map((item) => item.brand);
    const Class = data.map((item) => item.category);
    setBrandreference(Brand);
    setclassReference(Class);
  };

  useEffect(() => {
    getReference();
  }, []);

  const updateSearchText = () => {
    setSearchText(textRef.current.textContent);
  };

  const navigateUser = () => {
    const text = textRef.current.textContent;
    if (BrandRef.includes(text) || classRef.includes(text)) {
      if (BrandRef.includes(text)) {
        setquery({ brand: text });
      } else {
        setquery({ category: text });
      }
      nav("/products");
    } else {
      nav(`/products/${text}`);
    }
    setSearchText("");
  };

  return (
    <div className="recommended">
      <p ref={textRef} onClick={() => navigateUser()}>
        {product}
      </p>
      <FiArrowUpLeft onClick={() => updateSearchText()} />
    </div>
  );
}

export default Recommend;

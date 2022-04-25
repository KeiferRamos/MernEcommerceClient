import useGlobalContext from "../../Helper/AppProvider";
import axios from "axios";
import { useState, useEffect } from "react";

function Product() {
  const [products, setproducts] = useState([]);
  const { productURI, query } = useGlobalContext();
  const [selection, setselection] = useState([]);
  const categories = [
    "all",
    ...new Set(selection.map((item) => item.category)),
  ];
  const brand = ["all", ...new Set(selection.map((item) => item.brand))];
  const params = new URLSearchParams(query);
  const sortBtn = [
    { name: "brand", item: brand },
    { name: "category", item: categories },
    { name: "by Price" },
  ];

  const getAllProducts = async () => {
    const { data } = await axios.get(`${productURI}?${params.toString()}`);
    const response = await axios.get(productURI);
    setselection(response.data);
    setproducts(data);
  };

  useEffect(() => {
    getAllProducts();
  }, [query]);

  return { products, sortBtn };
}

export default Product;

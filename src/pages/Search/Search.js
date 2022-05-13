import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalcontext from "../../Helper/AppProvider";
import axios from "axios";

function Search() {
  const { productURI, searchText, setSearchText } = useGlobalcontext();
  const [products, setproducts] = useState([]);
  const [BrandRef, setBrandreference] = useState([]);
  const [classRef, setclassReference] = useState([]);
  const nav = useNavigate();

  const getProducts = async () => {
    const { data } = await axios.get(productURI);
    const mappedData = data
      .reduce((items, item) => {
        const { name, brand, category } = item;
        items.push(name, brand, category);
        return items;
      }, [])
      .filter((product) => product.toLowerCase().startsWith(searchText));
    setproducts([...new Set(mappedData)]);
  };

  const getReference = async () => {
    const { data } = await axios.get(productURI);
    const Brand = data.map((item) => item.brand);
    const Class = data.map((item) => item.category);
    setBrandreference(Brand);
    console.log(Brand);
    setclassReference(Class);
  };

  useEffect(() => {
    getReference();
    searchText ? getProducts() : setproducts([]);
  }, [searchText]);

  const clearSearch = () => {
    setSearchText("");
    nav(-1);
  };
  return { products, clearSearch, BrandRef, classRef };
}

export default Search;

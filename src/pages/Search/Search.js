import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalcontext from "../../Helper/AppProvider";
import axios from "axios";

function Search() {
  const { productURI, searchText, setSearchText } = useGlobalcontext();
  const [products, setproducts] = useState([]);
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

  useEffect(() => {
    searchText ? getProducts() : setproducts([]);
  }, [searchText]);

  const clearSearch = () => {
    setSearchText("");
    nav(-1);
  };
  return { products, clearSearch };
}

export default Search;

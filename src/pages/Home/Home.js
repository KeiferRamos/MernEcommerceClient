import useGlobalContext from "../../Helper/AppProvider";
import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
  const { productURI } = useGlobalContext();
  const [topSelling, settopSelling] = useState([]);
  const [sales, setsales] = useState([]);

  const getProducts = async () => {
    const { data } = await axios.get(productURI);
    const mappedData = data.filter((product) => product.topSelling);
    settopSelling(mappedData);
  };

  const getSales = async () => {
    const { data } = await axios.get(productURI);
    const mappedData = data.filter((product) => product.flashSale);
    setsales(mappedData);
  };

  useEffect(() => {
    getProducts();
    getSales();
  }, []);
  return { topSelling, sales };
}

export default Home;

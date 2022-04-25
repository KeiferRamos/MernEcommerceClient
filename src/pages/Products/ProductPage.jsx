import React from "react";
import useGlobalContext from "../../Helper/AppProvider";
import Products from "../../Components/Product";
import ComboBox from "../../Components/comboBox";
import Product from "./Product";
import Noitem from "../../Components/Noitem";
import Loading from "../../Components/Loading";

function ProductPage() {
  const { products, sortBtn } = Product();
  const { query } = useGlobalContext();
  return (
    <div className="Products">
      <div className="product-info">
        <p>BRAND: {query.brand || "all"}</p>
        <p>CATEGORY: {query.category || "all"}</p>
      </div>
      <div className="combobox-container">
        {sortBtn.map((sort, i) => (
          <ComboBox key={i} sort={sort} />
        ))}
      </div>
      <div className="products">
        {products.length > 0 ? (
          products.map((product, i) => {
            return <Products key={i} {...product} />;
          })
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

export default ProductPage;

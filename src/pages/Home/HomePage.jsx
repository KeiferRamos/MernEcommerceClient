import React from "react";
import "./Home.css";
import Product from "../../Components/Product";
import Home from "./Home";
import Loading from "../../Components/Loading";

function HomePage() {
  const { topSelling, sales } = Home();

  return (
    <div className="Home">
      <h3 className="headings">Top Selling</h3>
      <div className="products">
        {topSelling.map((product, i) => {
          return <Product key={i} {...product} />;
        })}
      </div>
      <h3 className="headings">flash Sales</h3>
      <div className="products">
        {sales.map((sale, i) => {
          return <Product key={i} {...sale} />;
        })}
      </div>
    </div>
  );
}

export default HomePage;

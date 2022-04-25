import React from "react";
import "./Search.css";
import { FiArrowLeft } from "react-icons/fi";
import Search from "./Search";
import useGlobalcontext from "../../Helper/AppProvider";
import Recommend from "../../Components/Recommend";

function SearchPage() {
  const { searchText, setSearchText } = useGlobalcontext();
  const { clearSearch, products } = Search();

  return (
    <div className="Search">
      <div className="search-bar">
        <FiArrowLeft onClick={() => clearSearch()} className="search-btn" />
        <input
          type="text"
          placeholder="e.g. earphone"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      {products.map((product, i) => {
        return <Recommend key={i} product={product} />;
      })}
    </div>
  );
}

export default SearchPage;

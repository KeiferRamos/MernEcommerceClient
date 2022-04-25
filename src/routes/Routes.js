import React from "react";
import { Routes, Route } from "react-router-dom";

import {
  CartPage,
  SearchPage,
  SingleProductPage,
  HomePage,
  ProductPage,
} from "../pages/index";

function RoutesPage() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route
        path="/products/:productName"
        element={<SingleProductPage />}
      />
    </Routes>
  );
}

export default RoutesPage;

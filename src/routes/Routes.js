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
      <Route path="/MernStackEcommerce/" element={<HomePage />} />
      <Route path="/MernStackEcommerce/products" element={<ProductPage />} />
      <Route path="/MernStackEcommerce/cart" element={<CartPage />} />
      <Route path="/MernStackEcommerce/search" element={<SearchPage />} />
      <Route
        path="/MernStackEcommerce/products/:productName"
        element={<SingleProductPage />}
      />
    </Routes>
  );
}

export default RoutesPage;

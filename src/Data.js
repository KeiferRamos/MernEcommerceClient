import { FaHome, FaShoppingCart } from "react-icons/fa";
import { FcRules, FcAnswers } from "react-icons/fc";

export const links = [
  { id: 3, name: "PRODUCTS", icon: null, path: "/products" },
  { id: 4, name: "SIGN-OUT", icon: null, path: "/profile" },
  { id: 1, name: "HOME", icon: <FaHome />, path: "/" },
  { id: 2, name: "CART", icon: <FaShoppingCart />, path: "/cart" },
];

export const modeOfPayments = [
  { name: "cash on delivery", icon: <FcAnswers /> },
  { name: "online payment", icon: <FcRules /> },
];

export const userInfo = [
  { parentInfo: "fullName", info: "firstName" },
  { parentInfo: "fullName", info: "lastName" },
  { parentInfo: "address", info: "streetAddress" },
  { parentInfo: "address", info: "Barangay" },
  { parentInfo: "address", info: "City" },
  { parentInfo: "address", info: "Region" },
  { parentInfo: "address", info: "ZipCode" },
  { parentInfo: null, info: "contact" },
  { parentInfo: null, info: "email" },
];

export const PaymentInfo = [
  { label: "cardNumber", type: "text" },
  { label: "ExpDate", type: "date" },
  { label: "SecurityCode", type: "text" },
  { label: "username", type: "text" },
];

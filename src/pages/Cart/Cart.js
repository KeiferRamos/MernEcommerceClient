import { useState, useEffect } from "react";
import axios from "axios";
import useGlobalcontext from "../../Helper/AppProvider";

function Cart() {
  const { usersURI, Info, setInfo } = useGlobalcontext();
  const adminURI = "http://localhost:5000/api/v1/admin";
  const [cart, setcart] = useState([]);
  const [notif, setnotif] = useState([]);
  const [total, settotal] = useState(0);
  const [isOnlineOption, setIsOnlineOption] = useState(false);
  const [notified, setnotified] = useState(false);
  const [showNotif, setshowNotif] = useState(false);
  const [errorMsg, setErrMsg] = useState("");
  const [incompleteError, setIncompleteError] = useState("");
  const [successMsg, setsuccessMsg] = useState("");
  const [user, setUser] = useState(null);
  const { modeOfpayment, moreInfo } = Info;
  const { details, selected } = modeOfpayment;
  const { address, fullName, contact, email } = moreInfo;
  const brands = [...new Set(cart.map((cart) => cart.item.brand))];
  const ShippingFee = brands.length * 50;

  const getCartItem = async () => {
    const { data } = await axios.get(usersURI);
    setcart(data.cart);
  };

  const closeDiv = () => {
    setshowNotif(false);
  };

  const getNotif = async () => {
    const { data } = await axios.get(usersURI);
    setnotif(data.Notif);
  };

  useEffect(() => {
    getNotif();
  }, []);

  useEffect(() => {
    if (notif.length > 0) {
      setnotified(true);
    }
  }, [notif]);

  const readNotif = () => {
    setnotified(false);
    setshowNotif(true);
  };

  const setModeOfpayment = (data) => {
    if (data.name == "online payment") {
      setIsOnlineOption(true);
    }
    setInfo({
      ...Info,
      modeOfpayment: { ...Info.modeOfpayment, ["selected"]: data.name },
    });
    clearError();
  };

  const checkIfcomplete = (parent, child, parentParent) => {
    const isComplete = child.every((item) => {
      return Info[parentParent][parent][item];
    });
    return isComplete;
  };

  const itemQuantity = cart.reduce((total, item) => {
    return item.quantity + total;
  }, 0);

  const clearError = () => {
    setIncompleteError("");
  };

  const checkOut = async () => {
    const name = Object.keys({ ...fullName });
    const location = Object.keys({ ...address });
    const det = Object.keys({ ...details });
    const isNameComplete = checkIfcomplete("fullName", name, "moreInfo");
    const isLocComplete = checkIfcomplete("address", location, "moreInfo");
    const isDetailComplete = checkIfcomplete("details", det, "modeOfpayment");
    if (cart.length > 0) {
      if (isNameComplete && isLocComplete && contact && email && selected) {
        if (selected == "online payment" && !isDetailComplete) {
          setIncompleteError(
            "Complete this form if you're choosing online payment"
          );
        } else {
          const orderSummary = {
            itemQuantity,
            TotalPrice: +total + ShippingFee,
            ItemPrice: +total,
            ShippingFee,
          };
          await axios.post(adminURI, {
            orders: cart,
            moreInfo,
            modeOfpayment,
            orderSummary,
          });
          await axios.patch(usersURI + "/clearcart");
          getCartItem();
          getTotal();
          setsuccessMsg("You're order has been process");
        }
      } else {
        setErrMsg("All fields are required");
      }
    } else {
      setErrMsg("NO ITEM IN CART");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrMsg("");
    }, 1000);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setsuccessMsg("");
    }, 2000);
    return () => clearTimeout(timer);
  }, [successMsg]);

  const setOption = (option) => {
    if (option == "Submit") {
      const isComplete = Object.keys(details).every((item) => details[item]);
      if (isComplete) {
        setIsOnlineOption(false);
      } else {
        setErrMsg("All fields are required");
      }
    } else {
      setIsOnlineOption(false);
    }
  };

  const getUser = async () => {
    const { data } = await axios.get(usersURI);
    setUser(data);
  };

  const getTotal = async () => {
    const response = await axios.get(usersURI);
    const products = response.data.cart;
    const { data } = await axios.patch(usersURI + "/totalPrice", {
      products,
    });
    settotal(data);
  };

  useEffect(() => {
    getCartItem();
    getTotal();
    getUser();
  }, []);

  return {
    cart,
    total,
    errorMsg,
    isOnlineOption,
    user,
    incompleteError,
    successMsg,
    itemQuantity,
    ShippingFee,
    notified,
    showNotif,
    notif,
    closeDiv,
    clearError,
    getCartItem,
    getTotal,
    setOption,
    setModeOfpayment,
    checkOut,
    readNotif,
    getNotif,
  };
}

export default Cart;

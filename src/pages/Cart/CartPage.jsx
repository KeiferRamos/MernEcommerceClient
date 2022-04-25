import React from "react";
import CartItem from "../../Components/CartItem";
import Cart from "./Cart";
import "./Cart.css";
import { modeOfPayments } from "../../Data";
import CartForm from "./CartForm";
import "../../Styles/loading.css";
import Payment from "./Payment";
import useGlobalcontext from "../../Helper/AppProvider";
import { FcAnswers } from "react-icons/fc";
import { FaTimes } from "react-icons/fa";
import Notif from "../../Components/notif";

function CartPage() {
  const {
    cart,
    total,
    isOnlineOption,
    user,
    errorMsg,
    incompleteError,
    successMsg,
    itemQuantity,
    ShippingFee,
    notified,
    showNotif,
    notif,
    readNotif,
    setOption,
    setModeOfpayment,
    checkOut,
    getTotal,
    getCartItem,
    clearError,
    closeDiv,
    getNotif,
  } = Cart();
  const { Info } = useGlobalcontext();
  const { selected } = Info.modeOfpayment;

  const checkOutInfo = [
    { title: "Item price:", value: total },
    { title: "item Quantity:", value: itemQuantity },
    { title: "Shipping fee:", value: ShippingFee },
    { title: "Total Price:", value: +total + ShippingFee },
  ];

  return (
    <div className="Cart">
      <div className="cart-item">
        {cart.map((product, i) => (
          <CartItem
            key={i}
            {...product}
            getTotal={getTotal}
            getallItem={getCartItem}
          />
        ))}
        {errorMsg && <p className="error">{errorMsg}</p>}
        {successMsg && (
          <div className="success-msg">
            <p>{successMsg}</p>
          </div>
        )}
      </div>
      <div className="user-cart-info">
        <h2>Note: Always submit after editing!</h2>
        <CartForm />
        <div className="modeOfpayment">
          <h5>mode of payment</h5>
          <div>
            {modeOfPayments.map((data, i) => (
              <div
                className={`${selected == data.name && "selected"} mode`}
                key={i}
                onClick={() => setModeOfpayment(data)}
              >
                <h1>{data.icon}</h1>
                <p>{data.name}</p>
                {data.name == "online payment" && incompleteError && (
                  <div className="incomplete-error">
                    <p>{incompleteError}</p>
                    <button onClick={() => clearError()}>Ok</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="user-details">
          <img
            src={`https://avatars.dicebear.com/api/initials/${user?.username}.svg`}
          />
          <div className="details">
            <p>{user?.email}</p>
            <p>{user?.username}</p>
          </div>
          <div className="notif">
            <FcAnswers onClick={() => readNotif()} />
            {notified && <div className="notif-symbol">!</div>}
            {showNotif && (
              <div className="orderNotif">
                <FaTimes
                  onClick={() => closeDiv()}
                  style={{ color: "#608590", margin: "10px", fontSize: "15px" }}
                />
                {notif.length > 0 ? (
                  notif.map((n, i) => (
                    <Notif {...n} key={i} getNotif={getNotif} />
                  ))
                ) : (
                  <div>
                    <p>no notification</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="check-out">
          <div className="item-info">
            {checkOutInfo.map((item, i) => (
              <p key={i}>
                {item.title}
                <span>{item.value}</span>
              </p>
            ))}
            <button onClick={() => checkOut()}>Check-out</button>
          </div>
        </div>
        {isOnlineOption && <Payment func={setOption} errorMsg={errorMsg} />}
      </div>
    </div>
  );
}

export default CartPage;

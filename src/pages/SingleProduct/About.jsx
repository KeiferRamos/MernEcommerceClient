import React from "react";
import SingleProduct from "./SingleProduct";
import Specs from "../../Components/Specs";
import useGlobalcontext from "../../Helper/AppProvider";

function About() {
  const { Info } = useGlobalcontext();
  const { singleProduct, getColor, addToCart, errMsg, sucessMsg } =
    SingleProduct();
  const { img, brand, name, price, specs, color } = singleProduct;

  return (
    <div className="about">
      <img src={img} alt="product image" />
      <div className="single-product-info">
        <h4 className="single-product-brand">{brand}</h4>
        <span>{name}</span>
        <p>Price: ₱{price}</p>
      </div>
      <div className="single-product-color">
        <div className="color-picker">
          {color?.map((color, i) => {
            return (
              <div
                key={i}
                onClick={() => getColor(color)}
                style={{
                  border: Info.preferredColor == color && "1px solid #bebebe",
                }}
              >
                <div style={{ background: color }} className="color"></div>
                <p>{color}</p>
              </div>
            );
          })}
          {errMsg && <p className="error">{errMsg}</p>}
          {sucessMsg && <p className="error">{sucessMsg}</p>}
        </div>
        <button className="addtocart-btn" onClick={() => addToCart()}>
          add to cart
        </button>
      </div>
      {specs && <Specs {...specs[0]} />}
      <div className="about-gadget">
        <h3>About the Gadget</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          officia eligendi et eos temporibus quos. Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Tempora dolor esse obcaecati enim sint,
          dolore dolorem eaque perspiciatis alias nisi.
        </p>
      </div>
    </div>
  );
}

export default About;

import React, { useState } from "react";
import Radio from "../../Components/Radio";
import { PaymentInfo } from "../../Data";
import useGlobalcontext from "../../Helper/AppProvider";

function Payment({ func, errorMsg }) {
  const { Info, setInfo } = useGlobalcontext();
  const { details } = Info.modeOfpayment;
  const [selected, setSelected] = useState(details.option);
  const choices = ["credit card", "PayPal", "Shoppe Pay"];

  const eventHandler = (e) => {
    setSelected(e.target.value);
    updateDetails("option", e);
  };

  const updateDetails = (value, e) => {
    setInfo({
      ...Info,
      modeOfpayment: {
        ...Info.modeOfpayment,
        details: { ...details, [value]: e.target.value },
      },
    });
  };

  return (
    <div className="payment">
      <div>
        <h4>payment method</h4>
        <p>Please choose your payment option here.</p>
        <div className="option">
          {choices.map((choice, i) => (
            <Radio
              key={i}
              text={choice}
              func={eventHandler}
              selected={selected}
            />
          ))}
        </div>
        {selected && (
          <div>
            <h4>Payment By {selected}</h4>
            <p>Please enter your {selected} detail below</p>
            {PaymentInfo.map((info, i) => (
              <div key={i} className="payment-info">
                <label>{info.label}:</label>
                <input
                  type={info.type}
                  value={details[info.label]}
                  onChange={(e) => updateDetails(info.label, e)}
                />
              </div>
            ))}
          </div>
        )}
        {selected && <button onClick={() => func("Submit")}>Submit</button>}
        <button onClick={() => func("close")}>close</button>
        {errorMsg && (
          <div className="payment-error">
            <p>{errorMsg}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;

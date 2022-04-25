import React from "react";

function Radio({ text, func, selected }) {
  return (
    <div>
      <input
        type="radio"
        value={text}
        checked={selected === text}
        onChange={(e) => func(e, "option")}
      />
      <label>{text}</label>
    </div>
  );
}

export default Radio;

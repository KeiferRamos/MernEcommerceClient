import React from "react";
import useGlobalcontext from "../Helper/AppProvider";

function Input({ info }) {
  const { Info, setInfo } = useGlobalcontext();
  return (
    <div className="input-field">
      <input
        type="text"
        value={Info[info]}
        onChange={(e) => setInfo({ ...Info, [info]: e.target.value })}
        placeholder={info}
      />
    </div>
  );
}

export default Input;

import React, { useState, useEffect } from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import useGlobalContext from "../Helper/AppProvider";
import "../Styles/Combobox.css";

function ComboBox({ sort }) {
  const { name, item } = sort;
  const [show, setshow] = useState(false);
  const { query, setquery } = useGlobalContext();

  const addQuery = (choices) => {
    setquery({ ...query, [name]: choices });
    setshow(false);
  };

  useEffect(() => {
    console.log(query);
  }, [query]);

  const sortHandler = () => {
    name == "by Price" &&
      setquery({ ...query, sortByPrice: show ? true : false });
    setshow(!show);
  };

  return (
    <div className="combobox">
      <div className="name">
        <p>{name}</p>
        <div onClick={() => sortHandler()}>
          {show ? <FaSortUp /> : <FaSortDown />}
        </div>
      </div>
      {show && (
        <div className="choices">
          {item?.map((e, i) => (
            <p key={i} onClick={() => addQuery(e)}>
              {e}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default ComboBox;

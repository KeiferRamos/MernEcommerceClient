import React, { useState } from "react";
import CartInput from "./cartInput";
import useGlobalcontext from "../../Helper/AppProvider";
import axios from "axios";
import { userInfo } from "../../Data";

function CartForm() {
  const { Info, usersURI } = useGlobalcontext();
  const { moreInfo } = Info;
  const [isEditing, setIsEditing] = useState(false);

  const addInfo = async () => {
    await axios.post(usersURI + "/add-info", moreInfo);
    setIsEditing(false);
  };

  return (
    <div className="user-info">
      {userInfo.map((user, i) => {
        const { parentInfo, info } = user;
        return (
          <div className={info} onClick={() => setIsEditing(true)} key={i}>
            <CartInput infoParent={parentInfo} info={info} />
          </div>
        );
      })}
      {isEditing && <button onClick={() => addInfo()}>submit form</button>}
    </div>
  );
}

export default CartForm;

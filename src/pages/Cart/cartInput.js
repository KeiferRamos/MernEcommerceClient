import axios from "axios";
import React, { useEffect } from "react";
import useGlobalcontext from "../../Helper/AppProvider";

function CartInput({ info, infoParent }) {
  const { Info, setInfo, usersURI } = useGlobalcontext();
  const { moreInfo } = Info;

  const getUserInfo = async () => {
    const user = await axios.get(usersURI);
    if (user.data.info) {
      setInfo({ ...Info, moreInfo: user.data.info });
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const eventHandler = (e) => {
    if (infoParent) {
      setInfo({
        ...Info,
        moreInfo: {
          ...Info.moreInfo,
          [infoParent]: {
            ...Info.moreInfo[infoParent],
            [info]: e.target.value,
          },
        },
      });
    } else {
      setInfo({
        ...Info,
        moreInfo: { ...Info.moreInfo, [info]: e.target.value },
      });
    }
  };

  return (
    <div className="cart-input">
      <p>{info}</p>
      <input
        placeholder={info}
        type="text"
        value={infoParent ? moreInfo[infoParent][info] : moreInfo[info]}
        onChange={(e) => eventHandler(e)}
      />
    </div>
  );
}

export default CartInput;

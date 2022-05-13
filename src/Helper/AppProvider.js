import axios from "axios";
import React, { useState, useEffect } from "react";
import { useContext, createContext } from "react";

const Globalcontext = createContext({});

export function AppProvider({ children }) {
  const [query, setquery] = useState({});
  const [searchText, setSearchText] = useState("");
  const productURI = "http://localhost:5000/api/v1/products";
  const usersURI = "http://localhost:5000/api/v1/users";
  const [haslogin, setHaslogin] = useState(null);
  const [newUser, setnewUser] = useState(false);
  const [Info, setInfo] = useState({
    username: "",
    email: "",
    password: "",
    verify: "",
    preferredColor: "",
    signingOut: false,
    moreInfo: {
      fullName: {
        firstName: "",
        lastName: "",
      },
      address: {
        streetAddress: "",
        Barangay: "",
        City: "",
        Region: "",
        ZipCode: "",
      },
      email: "",
      contact: "",
    },
    modeOfpayment: {
      selected: "",
      details: {
        option: "",
        cardNumber: "",
        ExpDate: "",
        SecurityCode: "",
        username: "",
      },
    },
  });

  const clearInput = () => {
    setInfo({
      username: "",
      email: "",
      password: "",
      verify: "",
      preferredColor: "",
      signingOut: false,
      moreInfo: {
        fullName: {
          firstName: "",
          lastName: "",
        },
        address: {
          streetAddress: "",
          Barangay: "",
          City: "",
          Region: "",
          ZipCode: "",
        },
        email: "",
        contact: "",
      },
      modeOfpayment: {
        selected: "",
        details: {
          option: "",
          cardNumber: "",
          ExpDate: "",
          SecurityCode: "",
          username: "",
        },
      },
    });
  };

  const hasLoggedIn = async () => {
    try {
      const { data } = await axios.get(usersURI + "/hasLoggedIn");
      setHaslogin(data);
    } catch (err) {
      setHaslogin(err.response.data);
    }
  };

  useEffect(() => {
    hasLoggedIn();
  }, []);

  return (
    <Globalcontext.Provider
      value={{
        newUser,
        Info,
        productURI,
        query,
        searchText,
        usersURI,
        haslogin,
        setnewUser,
        setInfo,
        setquery,
        setSearchText,
        hasLoggedIn,
        clearInput,
      }}
    >
      {children}
    </Globalcontext.Provider>
  );
}

export default () => useContext(Globalcontext);

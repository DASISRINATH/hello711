import React, { useContext, createContext, useState } from "react";

export const submitContext = createContext({});

const SubmitListContext = ({ children }) => {
  // States
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [center, setCenter] = useState({ lat: 17.385, lng: 78.486702 });
  const [city, setCity] = useState("itm_loca7b66748e03d457e976ca63a50e1bde0");
  const [s, setS] = useState(false);
  const [address, setAddress] = useState("");
  const [files, setFiles] = useState([]);
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fillAll, setFillAll] = useState(false);
  const [bedrooms, setBedrooms] = useState("");
  const [totalFloors, setTotalFloors] = useState("");
  const [rentType, setRentType] = useState("");

  const [validations, setValidations] = useState({
    title: false,
    posttype: false,
    categoryiddata: false,
    subcategoryiddata: false,
    latitude: false,
    longitude: false,
    address: false,
    price: false,
    area: false,
    rentType: false,
    listedby: false,
    description: false,
    files: false,
    totalFloors: false,
    bedrooms: false,
  });

  //   Functions
  const selectCity = (e) => {
    setCity(e.target.value);
    if (e.target.value === "itm_loca7b66748e03d457e976ca63a50e1bde0") {
      setCenter({ lat: 17.385, lng: 78.486702 });
    }
    if (e.target.value === "itm_loc32db8931aaf39e3dfb5c388799109d5b") {
      setCenter({ lat: 12.9716, lng: 77.594597 });
    }

    if (e.target.value === "itm_loc247387cc3640d1a88f3d9342d216dc13") {
      setCenter({ lat: 13.0827, lng: 80.270699 });
    }

    if (e.target.value === "itm_locc91e7fd5ffc739b26951228b0a564569") {
      setCenter({ lat: 17.968901, lng: 79.594101 });
    }
    if (e.target.value === "itm_loc0da9dce069f1f834f38f262ecc57ffd1") {
      setCenter({ lat: 18.871401, lng: 79.444298 });
    }
    if (e.target.value === "itm_loc892e3dbe2fbf07ae7b19455a4e75b28c") {
      setCenter({ lat: 18.438601, lng: 79.128799 });
    }
    setLatitude("");
    setLongitude("");
    setS(true);
  };

  const getlatlngdata = (data) => {
    setLatitude(data.lat);
    setLongitude(data.lng);
    console.log(latitude, longitude);
  };

  const getAddressdata = (data) => {
    setAddress(data);
  };

  const setSValue = (val) => {
    setS(val);
  };

  const numericVal = (val, fun, digit) => {
    if (val.length <= digit) fun(val);
  };

  const resetSubmitListStates = () => {
    setLatitude("");
    setLongitude("");
    setCenter({ lat: 17.385, lng: 78.486702 });
    setCity("itm_loca7b66748e03d457e976ca63a50e1bde0");
    setS(false);
    setAddress("");
    setFiles([]);
    setPhone("");
    setCountryCode("");
    setPrice("");
    setArea("");
    setPrice("");
    setTitle("");
    setDescription("");
    setBedrooms("");
    setRentType("");
    setTotalFloors("");
    setValidations({
      title: false,
      posttype: false,
      categoryiddata: false,
      subcategoryiddata: false,
      latitude: false,
      longitude: false,
      address: false,
      price: false,
      area: false,
      rentType: false,
      listedby: false,
      description: false,
      files: false,
      totalFloors: false,
      bedrooms: false,
    });
    setFillAll(false);
  };

  const validateSellApartment = () => {
    if (totalFloors === "") {
      setValidations((prev) => ({
        ...prev,
        totalFloors: true,
      }));
      return true;
    } else if (bedrooms === "") {
      setValidations((prev) => ({
        ...prev,
        bedrooms: true,
      }));
      return true;
    } else {
      return false;
    }
  };

  return (
    <submitContext.Provider
      value={{
        latitude,
        setLatitude,
        longitude,
        setLongitude,
        center,
        setCenter,
        city,
        setCity,
        s,
        setS,
        address,
        setAddress,
        selectCity,
        getlatlngdata,
        getAddressdata,
        setSValue,
        files,
        setFiles,
        phone,
        setPhone,
        countryCode,
        setCountryCode,
        price,
        setPrice,
        area,
        setArea,
        title,
        setTitle,
        description,
        setDescription,
        fillAll,
        setFillAll,
        bedrooms,
        setBedrooms,
        totalFloors,
        setTotalFloors,
        rentType,
        setRentType,
        validations,
        setValidations,
        resetSubmitListStates,
        numericVal,
        validateSellApartment,
      }}
    >
      {children}
    </submitContext.Provider>
  );
};

export default SubmitListContext;

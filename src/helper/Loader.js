import React from "react";
import ClipLoader from "react-spinners/PulseLoader";

let element;
const Loader = (props) => {
  element = props.loader ? <ClipLoader /> : null;
  return element;
};

export default Loader;

import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LoadData from "./LoadData";
import useStyles from "./useStyles";
import JSONPretty from 'react-json-prettify';
import Loader from "../../../helper/Loader";
import Alert from "../../layouts/Alert";
import { googlecode } from 'react-json-prettify/dist/themes';


const SearchKey = (props) => {
  const classes = useStyles();

  const [currentValue, setCurrentValue] = useState({
    msg: "",
    errorStatus: false,
    loader: false,
    user_data_1: "",
  });

  const [data, setData] = useState({ data: [] });

  const fetchData = async (user_data_1) => {
    // alert(currentEnv);
    console.log(user_data_1);
    try {
      setCurrentValue({
        ...currentValue,
        msg: "",
        errorStatus: false,
        loader: true,
      });

      let url = '';
      if (user_data_1 != 'abc') {
        url = user_data_1
      }
      else {
        url = `https://api.test.takengo.risee.in/index.php/rest/items/get/api_key/1fWwZNrzUiOW2pWEffgy3fXS1R7khL/limit/10/`
      }
      const result = await axios(url, {
        timeout: 10000,
      });
      console.log('a12345')
      console.log(result.data);
      if (result) {
        setData(result.data);
        setCurrentValue({
          ...currentValue,
          msg: "",
          errorStatus: false,
          loader: false,
        });
      } else {
        setData({ data: [] });
        setCurrentValue({
          ...currentValue,
          msg: " No data found !!!..",
          errorStatus: true,
          loader: false,
        });
      }
    } catch (error) {
      setData({ data: [] });
      setCurrentValue({
        ...currentValue,
        msg: `Something went wrong !!! ${error.message}`,
        errorStatus: true,
        loader: false,
      });
    }
  };

  const handleChange = (props, event) => {
    setCurrentValue({
      ...currentValue,
      user_data_1: event.target.value,
      errorStatus: false,
      msg: "",
    });
  };


  const handleSubmit = (props, event) => {
    event.preventDefault();
    fetchData(currentValue.user_data_1);
  };

  const customTheme = {
    ...googlecode,
    value: {
      ...googlecode.value,
      string: (value) => value === 'foo' ? 'red' : 'green',
    },
  };

  const NewJson = React.memo(({ data }) => (
    <JSONPretty json={data} theme={customTheme} padding={4} />
  ));

  return (
    <>
      <p className={classes.formHeader}>
        Type abc to get default data and enter full url to get data Eg: `https://api.test.takengo.risee.in/index.php/rest/items/get/api_key/1fWwZNrzUiOW2pWEffgy3fXS1R7khL/limit/10/` , This Data from DB  :{" "}
      </p>
      This Api We willl hit :  {currentValue.user_data_1}
      <form
        onSubmit={(event) => handleSubmit(props, event)}
        className={(classes.formControl, classes.container, classes.root)}
      >

        <TextField
          onChange={(event) => handleChange(props, event)}
          id="standard-basic"
          label="type url"
          minWidth="800"
          required="True"
          variant="outlined"
          className={classes.textField}
        />

        <Button
          size="medium"
          type="Submit"
          variant="text"
          color="primary"
          className={classes.button}
          disabled={currentValue.loader}
        >
          Submit
        </Button>
        <p className={classes.error}>{currentValue.msg} </p>
      </form>
      <Loader loader={currentValue.loader}></Loader>
      {/* can use any componet to load other data right now we just printing json only */}
      {/* <LoadData data_new={data}></LoadData> */}
      <NewJson data={data}></NewJson>
      <Alert
        errorMessage={currentValue.msg}
        err1={currentValue.errorStatus}
      ></Alert>
    </>
  );
};

export default SearchKey;

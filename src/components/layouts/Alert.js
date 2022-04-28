import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const CustomizedSnackbars = (props) => {
  const classes = useStyles();
  // const [open, setOpen] = useState(props.err1);
  // console.log("dipak..", props.err1);
  // console.log(props);
  let open = props.err1;


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    open = false;
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={600} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {props.errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomizedSnackbars;

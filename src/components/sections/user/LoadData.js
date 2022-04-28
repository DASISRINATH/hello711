import React from "react";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    // maxWidth: 775,
    background: "linear-gradient(5deg, #fafafa 30%, #fbfbaa 90%)",
  },
});

const LoadData = (props) => {
  const classes = useStyles();
  const data = props.data_new;
  return (
    // <div>
    <Card className={classes.root}>
      <Paper className={classes.root} elevation={3}>
        {/* Add element here by using data */}
        {console.log(data)}
      </Paper>
    </Card>
    // </div>
  );
};

export default LoadData;

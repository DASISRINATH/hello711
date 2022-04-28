import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
      background: "linear-gradient(45deg, #fafa 30%, #FF8E53 90%)",
    },
  },

  button: {
    // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    background: "linear-gradient(45deg, dodgerblue 100%, #FF8E53 90%)",
    // background: "red",
    border: 20,
    borderRadius: 10,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    margin: theme.spacing(1),
  },

  container: {
    // display: "flex",
    // flexWrap: "wrap",
  },
  // button: {
  //   margin: theme.spacing(1),
  // },
  textField: {
    // background: "linear-gradient(45deg, dodgerblue 30%, #FF8E53 90%)",

    width: 750,
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: 10,
    marginTop: 10,
    fontWeight: 500,
    marginTop: theme.spacing(1),

    border: 20,
    // borderRadius: 50,
    // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  input: {
    color: "blue",
  },

  formControl: {
    // margin: theme.spacing(1),
    // background: "linear-gradient(45deg, #ff6 30%, #FF8E53 90%)",
    // paddingBottom: 10,
    // minWidth: 100,
  },

  selectEmpty: {
    marginTop: theme.spacing(1),
  },

  error: {
    color: "red",
  },
  formHeader: {
    color: "dodgerblue",
  },
}));

export default useStyles;

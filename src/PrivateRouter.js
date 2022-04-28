import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { UserContext } from "./context/LoginContext"


const PrivateRoute = ({ component: Component, ...rest}) =>{ 

  const {isLoggedIn, setIsLoggedIn, setLoginuserId, setLoginuserData} = useContext(UserContext);

  const loginInfo = JSON.parse(localStorage.getItem('userlogin'));

  function homeLink(){
    const loginInfo = JSON.parse(localStorage.getItem('userlogin'));
    return(
      <>
      <Route
        {...rest}
        render={props => (loginInfo === null ? (<Redirect to={{ pathname:  '/', state: { from: props.location} }} />) : 
             (loginInfo.loginstatus ? (<Component {...props} />) : (<Redirect to={{ pathname:  '/', state: { from: props.location} }} />) ) 
          )}
      />
    </>
    )
  }

  function profile(){
    return(
      <>
      <Route
        {...rest}
        render={props => (<Component {...props} />)}
      />
    </>
    )
  }

  return (<> {isLoggedIn ? profile() : homeLink() } </>)
}
    
export default PrivateRoute;
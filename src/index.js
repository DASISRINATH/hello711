import React, { Suspense, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import NetworkStatus from "./InternetStatus";
import { ToastContainer } from "react-toastify";
import "./i18n";
import { UserContext } from "./context/LoginContext";
import Preloader from "./components/layouts/Preloader";

// Css
import "../node_modules/animate.css/animate.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";
import "../node_modules/magnific-popup/dist/magnific-popup.css";
import "../node_modules/react-select2-wrapper/css/select2.css";
import "../node_modules/leaflet/dist/leaflet.css";
import "./assets/fonts/flaticon/flaticon.css";
import "./assets/fonts/font-awesome/css/all.min.css";
import "./assets/css/style.css";
import "./assets/css/template.css";
import "react-toastify/dist/ReactToastify.css";

// import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
// import thunk from "redux-thunk";
// import rootReducer from "./reducers";
import store from "./store";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(thunk))
// );

import ItemsContext from "./context/ItemsContext";
import LoginContext from "./context/LoginContext";
import ChatmsgContext from "./context/ChatContext";
import SubmitListContext from "./context/SubmitListContext";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<Preloader />}>
        <LoginContext>
          <ItemsContext>
            <ChatmsgContext>
              <SubmitListContext>
                <App />
              </SubmitListContext>
              <ToastContainer
                autoClose={false}
                hideProgressBar
                pauseOnFocusLoss={false}
              />
              <NetworkStatus />
            </ChatmsgContext>
          </ItemsContext>
        </LoginContext>
      </Suspense>
    </BrowserRouter>
  </Provider>,
  document.getElementById("risee")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

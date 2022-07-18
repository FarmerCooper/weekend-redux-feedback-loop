import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import registerServiceWorker from "./registerServiceWorker";

// Redux
import { Provider } from "react-redux";
import { combineReducers } from "redux";
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";

//Reducers here
const feedbackList = (state = [], action) => {
    switch(action.type) {
        case 'GET_FEEDBACK':
            return action.payload;
        default:
            return state;
    }
}

// Store
const storeInstance = createStore(
    combineReducers(
        {
            //Reducers here
            feedbackList
        }
    ),
    applyMiddleware(logger)
)

// Provider/APP
ReactDOM.render(
  <Provider store = {storeInstance}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();

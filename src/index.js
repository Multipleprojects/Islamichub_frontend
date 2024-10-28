import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./store";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";

const Quran = () => (
  <Provider store={store}>
<App />  
  </Provider>
);

ReactDOM.render(<Quran />, document.getElementById("root"));
serviceWorker.unregister();

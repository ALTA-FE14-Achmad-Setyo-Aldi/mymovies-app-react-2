import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes";
import "./styles/index.css";
import { Provider } from "react-redux";
import store from "./utils/redux/store/store";

axios.defaults.baseURL = "https://api.themoviedb.org/3/movie/";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);

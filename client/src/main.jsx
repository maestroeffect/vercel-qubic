import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux"; // Import the Provider
import store from "./store/store"; // Import the Redux store

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/master.scss";
import "font-awesome/css/font-awesome.min.css";
import "react-modal-video/scss/modal-video.scss";
import './utils/i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> {/* Wrap the App component with the Provider */}
      <App />
    </Provider>
  </React.StrictMode>,
);

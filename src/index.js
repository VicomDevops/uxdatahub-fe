import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import "./assets/scss/index.scss"
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import "font-awesome/css/font-awesome.css";
import 'video-react/dist/video-react.css';
import { Provider } from "react-redux";
import store from "./utils/store";
import 'react-phone-number-input/style.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
const rootElement = document.querySelector("#root");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
reportWebVitals();

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import store from "./store";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import Search from "./components/Search";
import SearchResult from "./components/SearchResult";
import DetailedInfo from "./components/DetailedInfo/DetailedInfo";

import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Switch>
          <Route exact path="/" component={Search} />
          <Route path="/result/:query" component={SearchResult} />
          <Route path="/result/answers/:id" component={DetailedInfo} />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

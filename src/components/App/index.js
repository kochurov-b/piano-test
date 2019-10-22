import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import Search from "../Search";
import SearchResult from "../SearchResult";
import DetailedInfo from "../DetailedInfo";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import "./App.css";

export default () => {
  const location = useLocation();

  return (
    <div className="App">
      <h1>Search by Stack Overflow</h1>
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          timeout={{ enter: 600, exit: 200 }}
          classNames="fade-in"
        >
          <Switch location={location}>
            <Route exact path="/" component={Search} />
            <Route path="/search/q=:query" component={SearchResult} />
            <Route path="/question/:id" component={DetailedInfo} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

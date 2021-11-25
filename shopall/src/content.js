import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import HomePage from './homepage';
import SearchPage from './searchpage';
import DetailPage from './detail';
import AboutPage from './about';

const NotFound = () => <h1>Page Not Found</h1>;

export default function Contents() {
  return (
    <Switch>
      <Redirect exact from="/" to="/home" />
      <Route exact path="/home" component={HomePage} />
      <Route exact path="/search/:keyword" render={(props) => (<SearchPage keyword={props.match.params.keyword}/>)} />
      <Route exact path="/product/:styleID/:urlKey" render={(props) => (<DetailPage styleID={props.match.params.styleID} urlKey={props.match.params.urlKey}/>)} />
      <Route exact path="/about" component = {AboutPage} />
      <Route component={NotFound} />
    </Switch>
  );
}


import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import StartPage from '../components/StartPage';
import Releases from '../components/Releases';
import Features from '../components/Features';
import TypesOfLikes from '../components/TypesOfLikes';

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <Redirect from="/" to="/start" />} />
        <Route path="/start" component={StartPage} />
        <Route path="/likeAdmin/typesOfLikes" component={TypesOfLikes} />
        <Route path="/likeAdmin/releases" component={Releases} />
        <Route path="/likeAdmin/features" component={Features} />
      </Switch>
    </>
  );
};
export default Routes;

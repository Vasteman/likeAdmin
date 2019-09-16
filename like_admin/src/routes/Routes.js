import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import StartPage from '../components/StartPage';
import Releases from '../components/Releases';
import Features from '../components/Features';
import TypesOfLikesPanel from '../components/TypesOfLikes';

class Routes extends Component {
  componentDidMount() {
    const { fetchUserData } = this.props;
    fetchUserData({});
  }

  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" render={() => <Redirect from="/" to="/start" />} />
          <Route path="/start" component={StartPage} />
          <Route path="/likeAdmin/typesOfLikes" component={TypesOfLikesPanel} />
          <Route path="/likeAdmin/releases" component={Releases} />
          <Route path="/likeAdmin/features" component={Features} />
        </Switch>
      </>
    );
  }
}

Routes.propTypes = {
  fetchUserData: PropTypes.func.isRequired,
};

export default Routes;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import Dashboard from 'views/Dashboard';
import NotFound from 'views/NotFound';
import Menu from 'components/Global/Menu';

import * as actions from 'actions/app';

const publicPath = '/';

export const routeCodes = {
  DASHBOARD: publicPath,
};

@connect()
export default class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
  }

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(actions.initApp());
  }

  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <Menu />
          <div className='Page'>
            <Switch>
              <Route exact path={ publicPath } component={ Dashboard } />
              <Route path='*' component={ NotFound } />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

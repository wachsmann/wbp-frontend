import React from 'react';
import { Route,Switch } from 'react-router-dom';


import ExamplePageOne from '../../../Example/index';
import ExamplePageTwo from '../../../ExampleTwo/index';
import { AddRouting } from '../../../Routing';

export default ({ match }) => (
    <div>
        <Switch>
        <Route exact
              path={`${match.path}roteirizacao`}
              component={AddRouting}
          />
          <Route exact
              path={`${match.path}pages/two`}
              component={ExamplePageTwo}
          />
        </Switch>
    </div>
);


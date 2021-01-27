import React from 'react';
import { Route,Switch } from 'react-router-dom';


import ExamplePageOne from '../../../Example/index';
import ExamplePageTwo from '../../../ExampleTwo/index';
import { AddRouting,EditRouting,RoutingPage } from '../../../Routing';

export default ({ match }) => (
    <div>
        <Switch>
        <Route exact
              path={`${match.path}roteirizacao`}
              component={AddRouting}
          />
          <Route exact
              path={`${match.path}roteirizacao/edicao/:id`}
              component={EditRouting}
          />
          
          <Route exact
              path={`${match.path}`}
              component={AddRouting}
          />
        </Switch>
    </div>
);


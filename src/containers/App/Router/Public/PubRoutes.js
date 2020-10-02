import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../../../LogIn/index'
import Register from '../../../Register';

export default ({ match }) => (
    <div>
        <Switch>
            <Route exact
                path={`${match.path}`}
                component={Login}
            />
            <Route exact
                path={`${match.path}log_in`}
                component={Login}
            />
            <Route exact
                path={`${match.path}registra`}
                component={Register}
            />
        </Switch>
    </div>
);

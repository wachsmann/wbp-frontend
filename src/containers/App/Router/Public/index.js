import React from 'react';
import { Route, Redirect} from 'react-router-dom';

import { isAuthenticated } from "../../../../shared/helpers";
import PubRoutes from './PubRoutes'
export default ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
            //If Auth on -> redirect to application
            <Redirect to={{ pathname: "/app", state: { from: props.location } }} />
        ) : (
            //Else -> go on
            <PubRoutes {...props} />
        )
      }
    />
  );
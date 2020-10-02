import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { isAuthenticated } from "../../../../shared/helpers";
import { groupBy, uniqBy } from 'lodash';
import Layout from '../../../Layout/index';
import PrivRoutes from './PrivRoutes';

export default ({ component: Component, ...rest }) => {

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (

          rest.location.pathname.includes("roteirizacao") || rest.location.pathname.includes("roteirizacao") ?
            <div>
              <div className="container__wrap">
                <PrivRoutes {...props} />
              </div>
            </div> :
            <div>
              <Layout />
              <div className="container__wrap">
                <PrivRoutes {...props} />
              </div>
            </div>

        ) : (
            //If Auth on -> redirect to application

            //Else -> go on

            <Redirect to={{ pathname: "/log_in", state: { from: props.location } }} />
          )
      }
    />
  )
};


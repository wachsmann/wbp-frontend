import React from 'react';
import { Switch } from 'react-router-dom';

import MainWrapper from '../MainWrapper';
import PublicRouter from './Public'
import PrivateRoutes from './Private';

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <PrivateRoutes path="/app/" />
        <PublicRouter path="/" />
      </Switch>
    </main>
  </MainWrapper>
);


export default Router;

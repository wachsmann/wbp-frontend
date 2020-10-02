import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import Grid from '@material-ui/core/Grid';


import RouteItemList from './RouteItemList';

const useStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,
    maxWidth: 752,
    width: '100%',
    backgroundColor: theme.palette.background.default,

  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));



export default function RouteList({ routes,removeRoute,handleItemClick }) {

  const classes = useStyles(); 
  return (

    <div className={classes.root}>
      <Grid item xs={12} md={12}>
        <div className={classes.demo}>
          <List id="routing-card" dense={true}>
            {
              routes && Object.keys(routes).map((key, index) => {
                let route = routes[key]
                return <RouteItemList
                  key={key}
                  handleItemClick={handleItemClick}
                  route={route}
                  removeRoute={removeRoute}

                />
              })
            }
          </List>
        </div>
      </Grid>
    </div>
  );
}

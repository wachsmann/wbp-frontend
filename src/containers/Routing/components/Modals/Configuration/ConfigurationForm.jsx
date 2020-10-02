/* eslint-disable react/no-children-prop */
import React, { useState } from 'react';
import {
  Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core';



export default function ConfigurationForm(props) {

  const { handleGeneralRadius, generalRadius } = props

  

  const GreenRadio = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);
  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <Col md={12} lg={12}>
            <Grid container spacing={2} alignItems="flex-end">
              {
                /**
                  <Grid item>
                <AccountCircle />
              </Grid>
                 */
              }
             
              <Grid item>
                <TextField id="radius" onChange={(e) => {
                  console.log(e.target.value)
                  handleGeneralRadius(e.target.value)

                }} value={generalRadius} label="Raio" />
              </Grid>
              
              <Grid item>
                {/*<TextField id="destiny-time" label="Horário de destino" />*/}
                
              </Grid>


            </Grid>
          </Col>
        
         



        </CardBody>
      </Card>
    </Col>
  )
}

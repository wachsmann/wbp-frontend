import React from 'react';
import {
    ButtonToolbar,Button
  } from 'reactstrap';
  import Icon from '@material-ui/core/Icon';
  
  import PlayForWorkIcon from '@material-ui/icons/PlayForWork';
import { IconButton } from '@material-ui/core';
import { Title } from '@material-ui/icons';
export default React.forwardRef((props, ref) => {
  return (
    <div className="imports-button">
        <ButtonToolbar>
        
        <IconButton onClick={props.handleClick} aria-label="delete" size="large">
          <PlayForWorkIcon  fontSize="inherit" />
          
        </IconButton>
        </ButtonToolbar>
       
       
    </div>
  )
})

  




import React from 'react';
import {
    ButtonToolbar,Button
  } from 'reactstrap';
  import SettingsIcon from '@material-ui/icons/Settings';


export default React.forwardRef((props, ref) => {
  return (
    <div className="imports-button">
        <ButtonToolbar>
          <Button className="btn square" onClick={props.handleClick} outline>
           <SettingsIcon/>
          </Button>
        </ButtonToolbar>
       
       
    </div>
  )
})

  




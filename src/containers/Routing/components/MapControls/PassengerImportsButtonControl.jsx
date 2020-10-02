import React from 'react';
import {
    ButtonToolbar,Button
  } from 'reactstrap';


  import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
export default React.forwardRef((props, ref) => {
  return (
    <div className="imports-button">
        <ButtonToolbar>
          <Button className="btn square" onClick={props.handleClick} outline>
            <EmojiPeopleIcon/>
          </Button>
        </ButtonToolbar>
       
       
    </div>
  )
})

  




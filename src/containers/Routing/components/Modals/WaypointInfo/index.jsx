import React, {useState, useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import InfoForm from './InfoForm';
import Button from '@material-ui/core/Button';


export default function WaypointInfo(props) {
  const {
    waypoint,
    handleClose,
    open,
    handleInfoModal,
    waypointName,
    setWaypointName
  } = props
  const ref = React.createRef();
  
  
  const handleWaypointNameChange = (e)=>{
    setWaypointName(e.target.value)
  }
  
  const onClickClose = () => {
    waypoint.setName(waypointName)

    handleClose()
  }
  useEffect(() => {
    
    ref.current.addEventListener("waypointClickAction", (event) => {
     
      if(event.detail && event.detail.waypointId)
        return handleInfoModal(event.detail.waypointId)
      return alert("Ponto não existente!")
    });

    return () => {
      if (ref.current)
        ref.current.removeEventListener("waypointClickAction",null)
    }
  }, [])
  return (
    <div id="waypoint_info_modal" ref={ref}>
    <Dialog open={open} onClose={()=>handleClose()}  maxWidth={"lg"} aria-labelledby="form-dialog-title">
      
      <DialogContent>
        <InfoForm 
          handleWaypointNameChange={handleWaypointNameChange}
          address={waypoint && waypoint.getAddress()} 
          waypointName={waypointName} 
          waypointInfo={waypoint}
          nearPassengers={waypoint && waypoint.getNearPoints()}
          
        />
      </DialogContent>
      <DialogActions>
        
        <Button onClick={onClickClose} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  </div>
  );
}

import React from 'react';

import PassengerImportsButtonControl from '../../MapControls/PassengerImportsButtonControl';
import ImportsModal from './components/ImportsModal';

export default React.forwardRef((props, ref) => {
    const {passengers,createPassenger,addPassenger,deletePassenger,passengerUpdate,addPassengerMarkerListener} = props.passengerProps
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
      setOpen(false);
    };
  return (
    <div ref={ref}>
        <PassengerImportsButtonControl handleClick={()=>{setOpen(true)}} />
        <ImportsModal 
          routes={props.routes} 
          passengers={passengers} 
          createPassenger={createPassenger}
          addPassenger={addPassenger} 
          deletePassenger={deletePassenger} 
          passengerUpdate={passengerUpdate}
          addPassengerMarkerListener={addPassengerMarkerListener}
          generalRadius={props.generalRadius} 
          open={open} 
          handleClose={handleClose} />
    </div>
  );
})

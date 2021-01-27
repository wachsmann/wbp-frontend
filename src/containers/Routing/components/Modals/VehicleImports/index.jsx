import React from 'react';

import VehicleImportsButtonControl from '../../MapControls/VehicleImportsButtonControl';
import ImportsModal from './components/ImportsModal';

export default React.forwardRef((props, ref) => {
    const {vehicles,createVehicle,addVehicle,deleteVehicle} = props.vehicleProps
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
      setOpen(false);
    };
  return (
    <div ref={ref}>
        <VehicleImportsButtonControl handleClick={()=>{setOpen(true)}} />
        <ImportsModal 
          
          vehicles={vehicles} 
          createVehicle={createVehicle}
          addVehicle={addVehicle} 
          deleteVehicle={deleteVehicle} 
          
          
          
          open={open} 
          handleClose={handleClose} />
    </div>
  );
})

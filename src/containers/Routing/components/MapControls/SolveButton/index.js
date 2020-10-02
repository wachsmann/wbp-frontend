import React from 'react';
import SolverActionControl from './SolverActionControl';
export default React.forwardRef((props, ref) => {
    //const {vehicles,createVehicle,addVehicle,deleteVehicle} = props.vehicleProps
    
  return (
    <div ref={ref}>
        <SolverActionControl handleClick={props.handleSolveAction} />
    </div>
  );
})

import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
const Loader = () => {

    return (
        <div className="routing_loader">
        <CircularProgress size={44} />
        </div>
       
    )
}
export default Loader
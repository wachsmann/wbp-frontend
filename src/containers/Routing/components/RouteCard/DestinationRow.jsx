
import React from 'react';
export default function DestinationRow({componentIcon,address}){
    return (
        <div className="destination-row">
            {componentIcon}
            <h6 title={address}>{address.substring(0,30)}...</h6>
        </div>
    )
}

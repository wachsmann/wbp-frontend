import React, { useState } from 'react';

import ToggleField from './ToggleField';

export default React.forwardRef((props, ref) => {
  const {routes, passengers} = props
  const styles = {
    default: null,
    hide: [
      {
        featureType: 'poi',
        stylers: [{visibility: 'off'}]
      },
      {
        featureType: 'transit',
        elementType: 'labels.icon',
        stylers: [{visibility: 'off'}]
      },
      
    ]
  };
  const [routesVisibility,setRoutesVisibility] = useState(true)
  const [passengersVisibility,setPassengersVisibility] = useState(true)
  const [mapReferencesVisibility,setMapReferenceVisibility] = useState(true)
  const handleRoutesChangeVisibility = ()=>{
    setRoutesVisibility(!routesVisibility)
    
    Object.keys(routes).forEach(function (key, index) {
           
      routes[key].getRoutePolyline().changeVisibility(!routesVisibility);
      
    })
  }
  const handlePassengersChangeVisibility = ()=>{
    setPassengersVisibility(!passengersVisibility)

        
        Object.keys(passengers).forEach(key => {
          passengers[key].centerPoint.setVisible(!passengersVisibility)
        });

  }
  const handleMapReferencesChangeVisibility = ()=>{
    setMapReferenceVisibility(!mapReferencesVisibility)
    if(!mapReferencesVisibility){
      window.map.setOptions({styles: styles['default']});
    }else{
      window.map.setOptions({styles: styles['hide']});
    }
  }
  return (
    <div id="toggle-box" ref={ref} className="">
        <ToggleField handleToggleChange={handleRoutesChangeVisibility} status={routesVisibility} inputName="routes_toggle" displayName="Rotas" />
        <ToggleField handleToggleChange={handlePassengersChangeVisibility} status={passengersVisibility} inputName="passengers_toggle" displayName="Passageiros" />
        <ToggleField handleToggleChange={handleMapReferencesChangeVisibility} status={mapReferencesVisibility} inputName="map_reference_toggle" displayName="Referências" />
       
    </div>
  )
})


import React,{useState} from 'react';
import CloseIcon from 'mdi-react/CloseIcon';
import Divider from '@material-ui/core/Divider';
import classNames from 'classnames';
import DestinationRow from './DestinationRow'
//import DnDPoints from './DnDPoints/DnDPoints'
import RoomIcon from '@material-ui/icons/Room'
import FlagIcon from '@material-ui/icons/Flag'
export default ({route,eventHandlers,open}) => {
      const routeClass = classNames({
        route__wrap: true,
        'route__wrap--open': open,
      });
      
      const [name,setName] = useState(route.getName())
      
return (
    <div>
        <div className="route">
       
            <div className={routeClass} hidden={!open}>
                <div className="route__title-wrap">
                    
                    
                    <input
                    className="route-name"
                    value={name}
                    type="text"
                    name="route-name"
                    id="route-name"
                    onChange={
                        e => {
                            setName(e.target.value)
                            route.setName(e.target.value)
                        }
                    }
                    />
                    <p>Distância: {route.getDistance()} km </p>
                    <p>Tempo estimado: {route.getEstimatedTime()}</p>
                    {/*<p>Capacidade: {route.getCapacity()}</p>*/}
                    <button className="route__close-btn" type="button" onClick={eventHandlers.handleOpen}>
                    <CloseIcon />
                    </button>
                </div>
                <DestinationRow componentIcon={<RoomIcon/>} address={route.getLeg().length > 0 ? route.getLeg()[0].start_address:''}/>

                {/*<DnDPoints route={route} eventHandlers={eventHandlers} />*/}
                <DestinationRow componentIcon={<FlagIcon/>} address={route.getLeg().length > 0 ? route.getLeg()[route.getLeg().length - 1].end_address:''}/>
            </div>
      </div>
    </div>
)
}
  
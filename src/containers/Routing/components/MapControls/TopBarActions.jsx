import React, { useState } from 'react';
import {ORIGIN,DESTINY,STOP,ADDRESS } from '../../utils/constants'
import {
    ButtonToolbar,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown,
} from 'reactstrap';
import RoomIcon from '@material-ui/icons/Room';
import FlagIcon from '@material-ui/icons/Flag';
import PanToolIcon from '@material-ui/icons/PanTool';
import PersonIcon from '@material-ui/icons/Person';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';


export default React.forwardRef(({pinTypeProps}, ref) => {
    
    const {pinType,setPinType} = pinTypeProps
    function getPinTypeIcon(type) {
        
        switch (type) {
            case ORIGIN: return <RoomIcon />
            case DESTINY: return <FlagIcon />
            case STOP: return <PanToolIcon />
            case ADDRESS: return <PersonIcon />
            default:

        }
    }

    return (
        <div ref={ref} className="top_actions_routes" >
            <div id="search-box">

                <ButtonToolbar>
                    <div>

                        <UncontrolledDropdown className="icon-point">
                            <DropdownToggle className="icon icon--right " outline>
                                <p>{getPinTypeIcon(pinType)} <ChevronDownIcon /></p>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown__menu">
                                <DropdownItem title="Origem" onClick={() => setPinType(ORIGIN)}><RoomIcon /></DropdownItem>
                                <DropdownItem title="Destino" onClick={() => setPinType(DESTINY)}><FlagIcon /></DropdownItem>
                                {/*<DropdownItem title="Parada" onClick={() => setPinType(STOP)}><PanToolIcon /></DropdownItem>*/}
                                {/*<DropdownItem title="Passageiro" onClick={() => { setPinType(ADDRESS) }}><PersonIcon /></DropdownItem>*/}
                                
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>

                </ButtonToolbar>

            </div>

        </div>

    )
})
import React, { Component } from 'react';
import TopBarActions from './MapControls/TopBarActions';
import TogglesControl from './MapControls/Toggles/index'
import PassengerImportsButtonControl from './Modals/PassengerImports/index'
import VehicleImportsButtonControl from './Modals/VehicleImports/index'
import SearchLocationInput from './MapControls/SearchPlaces/SearchLocationInput';
import google from '../../../config/google'
import MainSideBar from './MainSideBar';
import ConfigurationButtonControl from './Modals/Configuration/index';
import SolveButtonControl from './MapControls/SolveButton'
class Map extends Component {
  constructor(props) {
    super()
    this.onScriptLoad = this.onScriptLoad.bind(this)
    
  }
  
  onScriptLoad() {
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);
      
    this.props.onMapLoad(map)
  }

  componentDidMount() {
    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.google.com/maps/api/js?key=${google.maps}&region=pt-BR&libraries=places,drawing,geometry`;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      // Below is important. 
      //We cannot access google.maps until it's finished loading
      s.addEventListener('load', e => {
        this.onScriptLoad()
        
      })
     
    } else {
      this.onScriptLoad()
    }
  }
  
  render() {
    const {mapRef,routeProps,passengerProps} = this.props
    
    return (
      <div style={
          { 
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
           }
          } id={this.props.id} >
            
            <MainSideBar 
              ref={mapRef.mainSideBarRef} 
              t={this.props.t}
              loading={this.props.loading}
              handleRoutingSave={this.props.handleRoutingSave}
           
              /** ROUTES */
              routeProps={routeProps}
             
              /** PASSENGER */
              passengerProps={passengerProps}

              passengerModalOpen={this.props.passengerModalOpen}
              passengerSelected={this.props.passengerSelected}
              setPassengerModalOpen={this.props.setPassengerModalOpen}

              /** RADIUS */
              getCurrentRadius={this.props.getCurrentRadius}
              generalRadius={this.props.generalRadius}
              handleGeneralRadius={this.props.handleGeneralRadius}


              id="main-bar"
            
            ></MainSideBar>
            <TopBarActions ref={mapRef.topBarActionsRef} pinTypeProps={this.props.pinTypeProps} />
            
            <PassengerImportsButtonControl
              
              generalRadius={this.props.generalRadius}
              passengerProps={passengerProps}
              routes={routeProps.routes} 
              ref={mapRef.passengerControlRef}
            />
            <SolveButtonControl
              handleSolveAction={this.props.handleSolveAction}
             ref={mapRef.solveControlRef}
            />
          <VehicleImportsButtonControl
              generalRadius={this.props.generalRadius}
              vehicleProps={this.props.vehicleProps}
              
              ref={mapRef.vehicleControlRef}
            />
              <ConfigurationButtonControl
                 t={this.props.t}
               
                
                 /** ROUTES */
                 routeProps={routeProps}
                
               
               
                 /** RADIUS */
                 getCurrentRadius={this.props.getCurrentRadius}
                 generalRadius={this.props.generalRadius}
                 handleGeneralRadius={this.props.handleGeneralRadius}
   
              ref={mapRef.configurationControlRef}
            />
        </div>
    );
  }
}

export default Map
import React from 'react';
import { makeStyles} from '@material-ui/core/styles';

import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';

import ConfigurationModal from './Modals/Configuration/ConfigurationModal'
import SaveInfo from './Modals/SaveInfo'
import { logout } from '../../../shared/helpers';

const MainCard = (props) => {
    const {t,routingTitle,routeProps,history,passengerProps,routeWay,setRouteWay,generalRadius,handleGeneralRadius,handleRoutingSave,customerProps} = props
    
    const {passengers} = passengerProps
    const [openConfiguration, setConfigurationOpen] = React.useState(false);
    const [openSaveInfo, setSaveInfo] = React.useState(false);

    const handleConfigurationOpen = () => {
      setConfigurationOpen(!openConfiguration);
    };
    const handleSaveInfoOpen = () => {
      setSaveInfo(!openSaveInfo);
    };
   
    
    return (
        <Grid container spacing={2}>
           
            <CardHeader
        avatar={
            <IconButton onClick={()=>{
              if(window.confirm("Atenção! Você está saindo da roteirização, deseja continuar?")){
                logout() 
                history.push('/log_in')
              }}} size={"small"} >
            <ExitToAppIcon />
          </IconButton>
        }
        action={
            <CardActions disableSpacing>
            <IconButton  size={"small"} onClick={handleSaveInfoOpen}  aria-label="add to favorites">
              <SaveIcon />
            </IconButton>
          
          
          <ConfigurationModal t={t} customerProps={customerProps} open={openConfiguration} generalRadius={generalRadius} routeWay={routeWay} setRouteWay={setRouteWay} handleGeneralRadius={handleGeneralRadius}  handleClose={handleConfigurationOpen}/>
          <SaveInfo routingName={routeProps.routingName} setRoutingName={routeProps.setRoutingName} open={openSaveInfo} handleRoutingSave={handleRoutingSave} handleClose={handleSaveInfoOpen}/>
          
          </CardActions>
          
        }
        title="Rotas"
        subheader={routingTitle ? routingTitle : ""}
      ></CardHeader>
      

      
        </Grid>
       
    )
}

export default withRouter(MainCard)
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
import PersonIcon from '@material-ui/icons/Person';
import ConfigurationModal from './Modals/Configuration/ConfigurationModal'
import SaveInfo from './Modals/SaveInfo'
const MainCard = (props) => {
    const {t,routingTitle,history,passengerProps,routeWay,setRouteWay,generalRadius,handleGeneralRadius,handleRoutingSave,customerProps} = props
    
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
            <IconButton onClick={()=>window.confirm("Atenção! Você está saindo da roteirização, deseja continuar?") ? history.push("/app/roteirizacao/inicio") : {}} size={"small"}  aria-label="add to favorites">
            <ExitToAppIcon />
          </IconButton>
        }
        action={
            <CardActions disableSpacing>
            <IconButton  size={"small"} onClick={handleSaveInfoOpen}  aria-label="add to favorites">
              <SaveIcon />
            </IconButton>
            <IconButton size={"small"}  onClick={handleConfigurationOpen} aria-label="settings">
                <MoreVertIcon />
          </IconButton>
          <div>
          <PersonIcon />{passengers && Object.keys(passengers).length}
          </div>
          
          <ConfigurationModal t={t} customerProps={customerProps} open={openConfiguration} generalRadius={generalRadius} routeWay={routeWay} setRouteWay={setRouteWay} handleGeneralRadius={handleGeneralRadius}  handleClose={handleConfigurationOpen}/>
          <SaveInfo open={openSaveInfo} handleRoutingSave={handleRoutingSave} handleClose={handleSaveInfoOpen}/>
          </CardActions>
        }
        title="Rotas"
        subheader={routingTitle ? routingTitle : ""}
      />

      
        </Grid>
       
    )
}

export default withRouter(MainCard)
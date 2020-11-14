import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DirectionsBus from '@material-ui/icons/DirectionsBus';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import { mongoObjectId } from '../utils/utils';


const useStyles = makeStyles((theme) => ({

      inline: {
        display: 'inline',
      },
      small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
      },
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

export default function RouteItemList({route,removeRoute,handleItemClick}) {
 
  const classes = useStyles();
  const _id = mongoObjectId()
  const name = `Rota ${(_id).substr(_id.length - 4, _id.length - 1)}`
  const vehicle = route.vehicle
  const visits = route.visits

  const color = route.color
  
  return (

    <div>
        <ListItemLink >
            <ListItemText
            primary={name.length > 30 ? `${name.substring(0,30)}...`:name}
            title={name}
            secondary={
                <React.Fragment>
                <Typography variant="caption" display="block" gutterBottom>
                    {`${vehicle.name} (Capacidade ${vehicle.capacity})`}
                </Typography>
               
                <Typography variant="caption" display="block" gutterBottom>
                Pontos atendidos: {visits.length}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                Qtd de passageiros atendidos: {
                  visits.reduce((accumulator, currentValue) => accumulator + currentValue.demand, 0)
                }
                </Typography>
                </React.Fragment>
            }
            />
            <ListItemSecondaryAction style={{display:"flex"}}>
              <Avatar className={classes.small} style={{backgroundColor:color}}>
                <DirectionsBus fontSize="small"  />
              </Avatar>
            {/*<IconButton onClick={()=>{removeRoute(routeId)}} size={"small"} edge="end" aria-label="delete">
                <DeleteIcon fontSize={"small"}/>
          </IconButton>*/}
            </ListItemSecondaryAction>
        </ListItemLink>
        <Divider />
        
        </div>
   
  );
}

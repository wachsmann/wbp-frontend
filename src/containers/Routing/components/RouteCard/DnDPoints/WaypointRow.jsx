import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import Typography from "@material-ui/core/Typography";

export default function WaypointRow({ waypoint, index, handleDelete,handleWaypointClick }) {

  return (
    <div className="draggable-row">
      <Draggable draggableId={waypoint.getId()} index={index}>
        {provided => (
          <div
          className="draggable-component"
            ref={provided.innerRef}
            {...provided.draggableProps}
            
          >
            <span onClick={(e)=>handleWaypointClick(waypoint.getId())} {...provided.dragHandleProps}>
             
              <IconButton  size={"small"} aria-label="add to favorites">
              <DragHandleIcon></DragHandleIcon> 
            </IconButton>
              <Typography variant="subtitle2" component="subtitle2">
              {`(${index + 1}) ${waypoint.getName()} `} 
                </Typography>
                <IconButton className="btn-delete" onClick={() => handleDelete(waypoint.getId())} size={"small"} edge="end" aria-label="delete">
              <DeleteIcon fontSize={"small"} />
            </IconButton>
              </span>
            

           
          </div>
        )}
       
      </Draggable>
      
    </div>

  );
}
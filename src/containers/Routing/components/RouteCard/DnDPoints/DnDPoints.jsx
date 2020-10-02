import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import WaypointRow from './WaypointRow'
/*
const WaypointList = React.memo(({ waypoints })=> {

    return waypoints.map((wpt, index) => (<Waypoint waypoint={wpt} index={index} key={wpt.getId()} />))
  })
*/
export default function DnDPoints({route,eventHandlers }) {
  
  const wpts = route.waypoints

  return (
    <div className="dnd-waypoints">
      <DragDropContext onDragEnd={(result) => { eventHandlers.onDragEnd({ result, wpts }) }}>
        <Droppable droppableId="list">
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {Object.keys(wpts).map((key, index) => (<WaypointRow waypoint={wpts[key]} handleDelete={eventHandlers.handleDelete} handleWaypointClick={eventHandlers.handleWaypointClick} index={index} key={wpts[key].getId()} />))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>

  );
}

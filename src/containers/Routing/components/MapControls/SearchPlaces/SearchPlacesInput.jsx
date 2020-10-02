import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
var autoComplete;
export default function SearchPlacesInput(props){
    const searchLocationControlRef = React.createRef();
    
    const [query, setQuery] = useState(props.value)
    
    
    useEffect(()=>{
        handleScriptLoad(setQuery,searchLocationControlRef)
    },[])
    const handleQuery = (query) => {
      
      setQuery(query)
    }
    
      // handle when the script is loaded we will assign autoCompleteRef with google maps place autocomplete
    function handleScriptLoad(updateQuery, autoCompleteRef) {
    
      // assign autoComplete with Google maps place one time
      updateQuery(query)
        autoComplete = new window.google.maps.places.Autocomplete(
          autoCompleteRef.current,
        )
     
        
    
      autoComplete.setFields(["address_components", "formatted_address","geometry"/*,"url"*/]); // specify what properties we will get from API
      // add a listener to handle when the place is selected
      autoComplete.addListener("place_changed", () =>  handlePlaceSelect(updateQuery))
    }
    async function handlePlaceSelect(updateQuery) {
      
      const places = autoComplete.getPlace()
      props.handleSearchPlacesSelected(places)
      updateQuery(places.formatted_address)      
    }

    return (
      <TextField 
      label="Endereço"
      inputRef={searchLocationControlRef}
      value={query} 
      placeholder="Buscar endereço..." 
      className={props.inputClassNames} 
      onChange={(e)=>{handleQuery(e.target.value)}} 
    />)
   
}


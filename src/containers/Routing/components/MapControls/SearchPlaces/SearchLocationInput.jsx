import React from "react";

export default React.forwardRef((props, ref) => {
    return (
      <div className="search-location-input">
        <input 
          ref={ref}
          value={props.query} 
          placeholder="Buscar endereço..." 
          className={props.inputClassNames} 
          onChange={(e)=>{props.handleQuery(e.target.value)}} 
        />
      </div>
    );
   
  
})


import React from 'react';
export default function ToggleField({displayName,inputName,status,handleToggleChange}) {

  return (

        <label className="toggle-btn customizer__toggle" htmlFor={`${inputName}`}>
            <input
            className="toggle-btn__input"
            type="checkbox"
            name={`${inputName}`}
            id={`${inputName}`}
            checked={status}
            onChange={handleToggleChange}
            />
            <span className="toggle-btn__input-label" />
            <span className="toggle-btn__display-label">{displayName}</span>
      </label>

    
      
    )
  
}

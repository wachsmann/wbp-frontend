import React from 'react';
export default function ActionPickerMapButton({displayName,inputName,value,checked = false}) {
    return (      
        <label className={`radio-btn--top-bar`}>
            <input
                name={`${inputName}`}
                type="radio"
                onChange={(e)=>{
                    console.log(e)
                    e.checked = !e.checked
                }}
                value={value}
                
                checked={checked}
                //disabled={disabled}
            />
            
            <span className="radio-btn__label">{displayName}</span>
        </label>

    )
}
import React from 'react'
import PropTypes from 'prop-types'
import InputMask from "react-input-mask"

const renderField = ({ input, placeholder, type, meta: {touched, error}, checked, mask, disabled }) => {
    
    return (
        <div className="form__form-group-input-wrap">
            <input type='hidden' value='something'/>
            <InputMask mask={mask} autoComplete="new-password" {...input} placeholder={placeholder} type={type} checked={checked} disabled={disabled} />
            {touched && error && <span className="form__form-group-error">{error}</span>}
        </div>
    )
}

renderField.propTypes = {
    input: PropTypes.shape().isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    meta: PropTypes.shape({
        touched: PropTypes.bool,
        error: PropTypes.string,
    }),
}

export default renderField
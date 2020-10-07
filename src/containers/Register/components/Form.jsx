import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm, Form } from 'redux-form';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import { NavLink } from 'react-router-dom';
import { Alert, Button } from 'reactstrap';
import renderField from '../../../shared/components/form/Field'
import validate from './validate'
import { useSelector } from 'react-redux';


const RegisterForm = (props) => {
  const {
    errorMessage, errorMsg, fieldUser, history, form,dispatch,syncErrors,handleSubmit
  } = props;
  const [formData, setFormData] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const {error} = useSelector(state=>state.auth)
  
  return (
    <form className="form"  onSubmit={handleSubmit}>
      <Alert
        color="danger"
        isOpen={!!Object.keys(error).length > 0}
      >
        {error.message}
        
      </Alert>
      <div className="form__form-group">
        <span className="form__form-group-label">{fieldUser}</span>
        <div className="form__form-group-field">
          <div className="form__form-group-icon">
            <AccountOutlineIcon />
          </div>
          <Field
            name="email"
            component={renderField}
            type="email"
            maxLength="32"
            placeholder={"E-mail"}
            
          />
        </div>
      </div>
      <div className="form__form-group">
        <span className="form__form-group-label">Senha</span>
        <div className="form__form-group-field">
          <div className="form__form-group-icon">
            <KeyVariantIcon />
          </div>
          <Field
            name="password"
            component={renderField}
            type={showPassword ? 'text' : 'password'}
            maxLength="32"
            placeholder={"Senha"}
            
          />
          <button
            type="button"
            className={`form__form-group-button${showPassword ? ' active' : ''}`}
            onClick={() => setShowPassword(!showPassword)}
          >
            <EyeIcon />
          </button>

        </div>
      </div>
      <div style={{width:"100%"}}>
      
            <Button className="btn btn-primary" style={{width:"100%"}} submit="true" color="primary" disabled={!!syncErrors}>Criar</Button>
            <Button  color="secondary" style={{width:"100%"}} onClick={()=>history.push('/log_in')} >Voltar</Button>
      </div>
    </form>
  )

}

export default reduxForm({
  form: 'register',
  validate,
})(RegisterForm)


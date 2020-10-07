import React from 'react';

import LogInFormPhoto from './components/Form';

import AuthService from '../../redux/services/AuthService';
import {actions}  from '../../redux/reducers/authReducer'
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Form from './components/Form'
const Ava = `${process.env.PUBLIC_URL}/img/logo-white.png`;
const RegisterPage = (props) => {
  const {history} = props
  const dispatch = useDispatch()
  const onSubmit = (values) => {//return history.push('/routing/')
    const {email,password} = values
    const service = new AuthService(actions)
    return dispatch(service.register({email, password,history}))
  }
  return (
    <div className=" account account--photo">
      <div className="account__wrapper">
        <div className="account__card">
        <div className="account__head">
            <h2 className="account__subhead subhead">Crie um usuário para ingressar</h2>
          </div>
          <Form history={history} onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  )
}

export default withRouter(RegisterPage)

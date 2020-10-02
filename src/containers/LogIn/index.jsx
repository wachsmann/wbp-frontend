import React from 'react';

import LogInFormPhoto from './components/Form';

import AuthService from '../../redux/services/AuthService';
import {actions}  from '../../redux/reducers/authReducer'
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const Ava = `${process.env.PUBLIC_URL}/img/logo-white.png`;
const LogIn = (props) => {
  const {history} = props
  const dispatch = useDispatch()
  const onSubmit = (values) => {//return history.push('/routing/')
    const {email,password} = values
    const service = new AuthService(actions)
    return dispatch(service.logIn({email, password,history}))
  }
  return (
    <div className=" account account--photo">
      <div className="account__wrapper">
        <div className="account__card">
          <img className="" src={Ava} alt="avatar" />
          <div className="account__head">
            <h4 className="account__subhead subhead">Planejador de roteamentos fretados no transporte de passageiros</h4>
          </div>
          <LogInFormPhoto onSubmit={onSubmit} fieldUser="E-mail" typeFieldUser="email" />

        </div>
      </div>
    </div>
  )
}

export default withRouter(LogIn)

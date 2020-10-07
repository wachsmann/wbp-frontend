import React, { PureComponent, useState } from 'react';
import DownIcon from 'mdi-react/ChevronDownIcon';
import { Collapse } from 'reactstrap';
import TopbarMenuLink from './TopbarMenuLink';
import { getUser, logout } from '../../../shared/helpers';

const Ava = `${process.env.PUBLIC_URL}/img/ava.png`;

export default function TopbarProfile (){
  
  const [collapse,setCollapse] = useState(false)
  const toggle = () => setCollapse(!collapse)
  const user = getUser()
    return (
      <div className="topbar__profile">
        <button type="button" className="topbar__avatar" onClick={toggle}>
          <img className="topbar__avatar-img" src={Ava} alt="avatar" />
          <p className="topbar__avatar-name">{!!user ? user.username :"Planejador"}</p>
          <DownIcon className="topbar__icon" />
        </button>
        {collapse && <button type="button" className="topbar__back" onClick={toggle} />}
        <Collapse isOpen={collapse} className="topbar__menu-wrap">
          <div className="topbar__menu">
            {/*<TopbarMenuLink title="Page one" icon="list" path="/pages/one" />
            <TopbarMenuLink title="Page two" icon="inbox" path="/pages/two" />
    <div className="topbar__menu-divider" />*/}
            <TopbarMenuLink title="Sair" icon="exit" handleClick={()=>logout()} path="/" />
          </div>
        </Collapse>
      </div>
    )
}

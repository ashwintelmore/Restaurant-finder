import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/Logo.png'
import { IoMdPerson } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { isEmpty, useFirebase ,isLoaded, authIsReady } from 'react-redux-firebase'
import Loder from '../helper/Loder'
/**
* @author
* @function Header
**/

const Header = (props) => {
  const auth = useSelector(state => state.firebase.auth);
  const firebase  =  useFirebase();
  if (!isLoaded(auth)) {
    return <Loder />;
  }
  
  return (
    <header className="header">
      <nav className="header__menu container">
        <div className="logo">
          <Link className="header__logo" to="/"><img src={Logo} alt="logo" /></Link>
        </div>
        <div className="menu-item flex flex-ai-c">
          {
            auth.isEmpty ?
            <li><Link className="header__links" to="/login" > Register/Login </Link></li>
            : 
            <li  onClick={()=>firebase.logout()}><Link className="header__links" to="/login" > Logout </Link></li>
          }
          {
            auth.isEmpty ?
            <li><Link className="header__links" to="/login" ><IoMdPerson size="40"/></Link></li>
            : 
             <li><Link className="header__links" to={`/profile/${auth.uid}`} ><IoMdPerson size="40"/></Link></li>
          }
          
        </div>
      </nav>
    </header>
  )

}

export default Header
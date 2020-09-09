import React from 'react'
import { Link } from 'react-router-dom'
import { Settings } from 'react-feather'

import '../../css/Header.css'

import GoogleAuthentication from './GoogleAuthentication'

const Header = () => {
    return (
        <div className="header-container">
            <Link to='/'>
                <div className="header-logo">
                    logo
                </div>
            </Link>
            <span className="header-other">
                <Link to='/'>
                    <div className="header-settings header-other-item">
                        <Settings className="btn-round" size={20} color='grey'/>
                    </div>
                </Link>  
                <Link to='/'>
                    <div className="header-login header-other-item">
                        <GoogleAuthentication/>
                    </div>
                </Link>  
            </span>
        </div>
    )
}

export default Header
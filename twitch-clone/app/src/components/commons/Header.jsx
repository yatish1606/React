import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Settings } from 'react-feather'
import OutsideClickHandler from 'react-outside-click-handler'

import '../../css/Header.css'

import GoogleAuthentication from './GoogleAuthentication'
import { useSelector } from 'react-redux'

const Header = () => {

    const [showSettings, setShowSettings] = useState(false)

    return (
        <div>
            <div className="header-container">
                <Link to='/'>
                    <div className="header-logo">
                        logo
                    </div>
                </Link>
                <span className="header-other">
                    <div className="header-settings header-other-item" onClick={() => setShowSettings(!showSettings)}>
                        <Settings className="btn-round" size={20} color='grey'/>
                    </div>
                    <div className="header-login header-other-item">
                        <GoogleAuthentication/>
                    </div>
                </span>
            </div>
            {
                showSettings ? 
                <OutsideClickHandler onOutsideClick={() => setShowSettings(false)}>
                    <div className='settings-dropdown-container'>
                        <button className="btn primary">
                            
                        </button>
                    </div>
                </OutsideClickHandler>
                : null
            }
            
        </div>
        
    )
}

export default Header
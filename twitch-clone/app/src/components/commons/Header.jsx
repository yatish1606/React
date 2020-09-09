import React from 'react'
import '../../css/Header.css'
import { Link } from 'react-router-dom'

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
                        settings
                    </div>
                </Link>  
                <Link to='/'>
                    <div className="header-login header-other-item">
                        login
                    </div>
                </Link>  
            </span>
        </div>
    )
}

export default Header
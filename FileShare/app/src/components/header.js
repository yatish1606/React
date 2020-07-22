import React, { Component } from 'react'
import SendRoundedIcon from '@material-ui/icons/SendRounded';

export default class Header extends Component{
    render() {
        return (
            <div className="app-header">
                <div className="app-site-info">
                    <h1><SendRoundedIcon style={{fontSize:50, color:'#ffffff', transform:`rotate(-30deg)`,}}/> FileShare</h1>
                    <div className="site-title">Share your files</div>
                    <div className="site-slogan">Secure. Safe. Free.</div>
                </div>
            </div>
        )
    }
}
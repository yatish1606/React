import React, {Component} from 'react'
import Home from '../pages/home'

export default class Layout extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <div className="app-layout">
                <Home/>
            </div>
        )
    }
}
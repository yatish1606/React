import React, {Component} from 'react'

export default class Layout extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <div className="app-layout">
                <div className="app-container">
                    <div className="app-header">
                        this is the left part
                    </div>
                    <div className="app-content">
                        this is the right part
                    </div>
                </div>
            </div>
        )
    }
}
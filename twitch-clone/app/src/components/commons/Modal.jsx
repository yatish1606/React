import React from 'react'
import ReactDOM from 'react-dom'
import history from '../../history'

import '../../css/modal.css'

class Modal extends React.Component {

    renderActionButtons = actions => {
        return actions.map(action => {
            return (
                <button className={`btn ${action.class} no-icon`}>{action.name}</button>
            )
        })
    }

    render() {
        console.log(this.props)

        const { title, description, actions } = this.props

        return ReactDOM.createPortal(
            <div 
                className="modal-background" 
                style={{display: this.props.displayModal}}
                onClick={() => history.push('/')}
            >
                <div 
                    className="modal-content-container"
                    onClick={event => event.stopPropagation()}
                >
                    {/* Content goes below */}
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <div className="modal-actions">
                       {this.renderActionButtons(actions)}
                    </div>
                </div>
            </div>,
            document.querySelector('#modal-root')
        )
    }
}

export default Modal
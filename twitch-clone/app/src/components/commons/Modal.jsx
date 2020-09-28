import React from 'react'
import ReactDOM from 'react-dom'
import history from '../../history'

import '../../css/modal.css'

class Modal extends React.Component {
    render() {
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
    
                </div>
            </div>,
            document.querySelector('#modal-root')
        )
    }
}

export default Modal
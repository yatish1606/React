import React, { Component} from 'react'
import fileUploadingSent from '../images/file-sent.png'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {history} from '../history'

class HomeUploadingSent extends Component {
    constructor(props){
        super(props)
    }

    render() {

        const {data} = this.props
        const pushID = _.get(data,'_id')
        return (
            <div className={"app-card app-card-uploading-sent"}>
                
                    <div className="app-card-content">
                        <div className="app-card-content-inner">
                            <div className="app-home-uploading">
                                <div className="app-home-uploading-icon">
                                    <img src={fileUploadingSent} alt='file-uploading'/>
                                </div>

                                <div className="app-home-upload-sent-text app-text-center">
                                    <h3>Files Sent!</h3>
                                    <p>We have sent an email to {_.get(data,'to')} with a link to download the files. The link expires in 30 days</p>
                                </div>

                                <div className="app-form-actions app-uploading-sent-actions">
                                    <button 
                                        onClick = {() => {
                                            history.push(`/share/${pushID}`)
                                        }}
                                        type="button" className="app-button primary">View files
                                    </button>
                                    <button 
                                        onClick={() => {
                                            if(this.props.onAnotherFileSend){
                                                this.props.onAnotherFileSend(true)
                                            }
                                        }}
                                        type="button" className="app-button ">Send more files
                                    </button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                
            </div>
        )
    }
}

HomeUploadingSent.propTypes = {
    data: PropTypes.object,
    onAnotherFileSend : PropTypes.func
}

export default HomeUploadingSent
import React, { Component} from 'react'
import fileUploadingSent from '../images/file-sent.png'

class HomeUploadingSent extends Component {
    constructor(props){
        super(props)

    }

    render() {
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
                                    <p>We have sent an email to example@gmail.com with a link to download the files. The link expires in 30 days</p>
                                </div>

                                <div className="app-form-actions app-uploading-sent-actions">
                                    <button type="button" className="app-button primary">View files</button>
                                    <button type="button" className="app-button ">Send more files</button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                
            </div>
        )
    }
}

export default HomeUploadingSent
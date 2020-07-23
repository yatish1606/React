import React, { Component } from 'react'
import fileUploading from '../images/file-uploading.png'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {betterNumber} from '../helpers'

class HomeUploading extends Component {
    
    constructor(props){
        super(props)

        this.state = {
            data:null,
            percentage:60,
            event:null,
            loaded:0,
            total:0
        }
    }

    componentDidMount() {
        const {data} = this.props
        this.setState({data:data})
        console.log('got data from parent', data)
    }

    componentWillReceiveProps(nextProps) {
        const {event} = nextProps

        switch (_.get(event, 'type')){
            case 'onUploadProgress':
                const loaded = _.get(event, 'payload.loaded',0)
                const total = _.get(event, 'payload.total',0)
                const percentage = loaded !== 0 ? (loaded / total)*100 : 0
                this.setState({percentage:percentage, loaded:loaded, total:total})
            default:
                break
        }
        
    }

    render() {
        
        const {percentage, data, total, loaded, } = this.state
        const totalFiles = _.get(data, 'files', []).length
        
        return (

            
            <div className={"app-card app-card-uploading"}>
                
                    <div className="app-card-content">
                        <div className="app-card-content-inner">
                            <div className="app-home-uploading">
                                <div className="app-home-uploading-icon">
                                    <img src={fileUploading} alt='file-uploading'/>
                                    <h3>Sending your files</h3>
                                </div>
                                <div className="app-upload-files-total">
                                    Uploading {totalFiles} files
                                </div>
                                <div className="app-progress">
                                    <span style={{width:`${percentage}%`}} className="app-progress-bar"/>
                                </div>
                                <div className="app-upload-stats">
                                    <div className="app-upload-stats-left">
                                        {betterNumber(loaded)} Bytes / {betterNumber(total)} Bytes
                                    </div>
                                    <div className="app-upload-stats-right">
                                        456 Kbps
                                    </div>
                                </div>
                                <div className="app-form-actions">
                                    <button className={"app-button app-uploading-button"} type="button">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                
            </div>
        )
    }
}

HomeUploading.propTypes = {
    data: PropTypes.object,
    event: PropTypes.object
}
export default HomeUploading
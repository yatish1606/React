import React, { Component } from 'react'
import fileUploading from '../images/file-uploading.png'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {betterNumber, betterNumberForSpeed} from '../helpers'

class HomeUploading extends Component {
    
    constructor(props){
        super(props)

        this.state = {
            data:null,
            percentage:60,
            event:null,
            loaded:0,
            total:0,
            startTime: new Date,
            lastLoaded : 0,
            speedUpload : 0
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

                const currentTime = new Date()
                const differenceBetweenStartAndCurrentTime = currentTime - this.state.startTime

                if(differenceBetweenStartAndCurrentTime === 0){
                    differenceBetweenStartAndCurrentTime = 1
                }

                const speedPerMilliSecond = (loaded - this.state.lastLoaded) / differenceBetweenStartAndCurrentTime
                const speedPerSecond = speedPerMilliSecond * 1000

                this.setState({percentage:percentage, loaded:loaded, total:total, speedUpload : speedPerSecond, startTime: currentTime, lastLoaded: loaded})
            default:
                break
        }
        
    }

    render() {
        
        const {percentage, data, total, loaded, speedUpload} = this.state
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
                                        {betterNumber(loaded)} / {betterNumber(total)}
                                    </div>
                                    <div className="app-upload-stats-right">
                                        {betterNumberForSpeed(speedUpload)}/s
                                    </div>
                                </div>
                                <div className="app-form-actions">
                                    <button onClick = {() => {
                                        if(this.props.onCancel){
                                            this.props.onCancel(true)
                                        }
                                    }} 
                                    className={"app-button app-uploading-button"} 
                                    type="button">Cancel</button>
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
    event: PropTypes.object,
    onCancel : PropTypes.func
}
export default HomeUploading
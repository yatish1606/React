import React, { Component } from 'react'
import _ from 'lodash'
import {getDownloadInformation} from '../helpers/download'
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import fileDownload from '../images/file-download.png'
import {APIURL} from '../config'
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import {betterNumber} from '../helpers'
import {history} from '../history'

class View extends Component {
    constructor(props){
        super(props)

        this.state = {
            post : null
        }

        this._getTotalDownloadSize = this._getTotalDownloadSize.bind(this);
    }

    componentWillMount() {

        const {match} = this.props
        const postID = _.get(match, 'params.id')

        getDownloadInformation(postID)
            .then(response => {
                this.setState({post : response.data})
                console.log(this.state.post)
            })
            .catch(err => console.log('Error : ', err))
    }

    _getTotalDownloadSize() {
        const {post} = this.state
        let totalSize = 0
        const files = _.get(post, 'files', [])

        _.each(files, file => {
            totalSize += _.get(file, 'size', 0)
        })

        return betterNumber(totalSize) 
    }

    render() {
        const {post} = this.state
        const files = _.get(post, 'files',[])
        const postID = _.get(post, '_id', null)
        return ( 
            <div className='app-page-download'>
                <div className='app-top-header'>
                    <h1 onClick={() => history.push('/')}><SendRoundedIcon style={{fontSize:33, color:'#ffffff', transform:`rotate(-30deg)`,}}/> FileShare</h1>
                </div>
                <div className={"app-card app-card-uploading-sent"}>     
                        <div className="app-card-content">
                            <div className="app-card-content-inner">
                                <div className="app-home-uploading-icon">
                                    <img src={fileDownload} alt='file-download'/>
                                </div>
                                <div className="app-text-center app-download-text">
                                    <h3>Ready to Download</h3>
                                    <ul>
                                        <li>{files.length} file{files.length > 1 ? 's' : ''}</li>
                                        <li>{this._getTotalDownloadSize()}</li>
                                        <li>Expires in 30 days</li>
                                    </ul>
                                </div>
                                <div className="app-download-file-list">
                                
                                    {
                                        files.map((file,index) => {
                                            return (
                                            <div className="app-download-file-list-item" key={index}>
                                                <div className="fileitem">{_.get(file, 'originalName')}</div>
                                                <div className="download-icon"><a href={`${APIURL}/download/${_.get(file, '_id')}`}><GetAppRoundedIcon style={{fontSize:22, color:'#ababab',}}/></a></div>
                                            </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className='app-download-action app-form-actions'>
                                    <a href={`${APIURL}/posts/${postID}/download`} className='app-button primary' type='button'>Download All</a>
                                    <button type='button' className='app-button'>Share</button>
                                </div>
                            </div>
                        </div>
                    
                </div>
            </div>
            
        )
    }
}

export default View
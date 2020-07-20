import React, { Component } from 'react'

export default class HomeForm extends Component {
    render() {
        return (
            <div className="app-card">
                <form>
                    <div className="app-card-header">
                        <div className="app-card-header-inner">
                            <div className="app-file-select-zone">
                                <label htmlFor="input-file">
                                    <input id={'input-file'} type="file" multiple={true}></input>
                                    <span className="app-upload-icon"/>
                                    <span className="app-upload-description">Drag and drop your files here</span>
                                </label>
                            </div>            
                        </div>
                    </div>
                    <div className="app-card-content">
                        <div className="app-card-content-inner">
                            content inner
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
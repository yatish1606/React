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
                            <div className="app-form-item">
                                <label htmlFor="to">SEND TO</label>
                                <input name="to" placeholder="Email address here" type="text" id="to"></input>
                            </div>
                              
                            <div className="app-form-item">
                                <label htmlFor="from">FROM</label>
                                <input name="from" placeholder="Your email address here" type="text" id="to"></input>
                            </div>
                                        
                            <div className="app-form-item">
                                <label htmlFor="message">MESSAGE</label>
                                <textarea placeholder="Add an optional message" name="message" id="message"></textarea>
                            </div>

                            <div className="app-form-actions">
                                <button className={"app-button primary"} type="submit">Send</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
import React, {Component} from 'react'
import Header from '../components/header'
import HomeForm from '../components/home-form'

export default class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data:null,
            uploadEvent:null
        }
    }
    
    render () {
        return (
            
            <div className="app-container">
                    <Header/>
                    <div className="app-content">
                        <HomeForm onUploadBegin = {(event) => {
                            console.log('Event passed', event)
                        }}/>
                    </div>
            </div>
            
        )
    }
}
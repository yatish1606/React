import React, { Component } from 'react'
import _ from 'lodash'
import {getDownloadInformation} from '../helpers/download'

class View extends Component {
    constructor(props){
        super(props)

        this.state = {
            post : null
        }
    }

    componentWillMount() {

        const {match} = this.props
        const postID = _.get(match, 'params.id')

        getDownloadInformation(postID)
            .then(response => {
                this.setState({post : _.get(response, 'data')})
            })
            .catch(err => console.log('Error : ', err))
    }

    render() {
        return (
            <div>
                hey this is view page
            </div>
        )
    }
}

export default View
import React from 'react'
import './imageList.css'

class ImageCard extends React.Component {

    constructor(props){
        
        super(props)

        this.state = {
            spans : 0
        }
        this.imageRef = React.createRef()
        this.componentDidMount = this.componentDidMount.bind(this)      
    }

    componentDidMount = function () {
        this.imageRef.current.addEventListener('load', this.setSpan)
    }

    setSpan = () => {
        const clientHeight = this.imageRef.current.clientHeight
        const spans = Math.ceil(clientHeight/10 + 1)
        this.setState({spans})
    }

    render() {
        const {image} = this.props
        return (
            <div
                style={{gridRowEnd: `span ${this.state.spans}`}}
            >
                <img
                    ref={this.imageRef}
                    src={image.urls.regular} 
                    alt={image.description}
                />
            </div>
        )
    }
}

export default ImageCard
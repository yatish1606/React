import React from 'react'
import './imageList.css'

class ImageCard extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            image : null
        }
        
        this.imageRef = React.createRef()

        this.UNSAFE_componentWillReceiveProps = (nextProps) => {
            this.setState({image : nextProps})
        }
    }
    render() {
        const {image} = this.state
        return (
            <div>
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
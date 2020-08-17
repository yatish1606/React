import React from 'react'
import './imageList.css'
import ImageCard from './ImageCard'

class ImageList extends React.Component {

    constructor(props) {
        super(props) 
        
    }

    render() {
            
        const images = this.props.images.map(image => {
            return (
                <ImageCard 
                    image={image}
                    key={image.id}
                />
            )
        })

        return (
            <div className='image-list'>
                {images}
            </div>
        )
    }
}

export default ImageList
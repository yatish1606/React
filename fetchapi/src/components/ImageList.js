import React from 'react'
import './imageList.css'

class ImageList extends React.Component {


    constructor(props) {
        super(props)     
    }

    render() {
            
        const images = this.props.images.map(({id,urls,description}) => {
            return (
                <div key={id}>
                    <img src={urls.regular} alt={description}/>
                </div>
                
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
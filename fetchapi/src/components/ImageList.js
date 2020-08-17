import React from 'react'

class ImageList extends React.Component {


    constructor(props) {
        super(props)

        this.componentDidMount = async () => {
            const images = await this.props.images
            console.log(images)
        }
    }

    render() {
        return (
            <div>
                this is image list
                found {this.props.images.length} images
            </div>
        )
    }
}

export default ImageList
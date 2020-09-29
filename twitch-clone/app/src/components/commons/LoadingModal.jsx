import React from 'react'
import Modal from '../commons/Modal'
import Lottie from "lottie-react"
import loadingAnimation from '../../assets/loading.json'

class LoadingModal extends React.Component {

    render() {
        
        return (
            <div>
                <Modal
                    title="Loading"
                    description="We are loading the stream information. Hang in there!"
                    content={[
                        <Lottie 
                            animationData={loadingAnimation} 
                            loop 
                            autoplay 
                            style={{width: '40%', height: 'auto'}}/>
                    ]}
                />
            </div>
        )
    }
}

export default LoadingModal
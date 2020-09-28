import React from 'react'
import Modal from '../commons/Modal'

const StreamDelete = () => {
    return (
        <div>
            <Modal
                title="Delete Stream?"
                description="Are you sure you want to delete this stream?"
                actions = {[
                    {name: 'Cancel', class: 'secondary', action:'goback'},
                    {name:'Delete', class:'primary'},
                ]}
            />
        </div>
    )
}

export default StreamDelete
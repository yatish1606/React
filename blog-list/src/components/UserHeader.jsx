import React, { useEffect } from 'react'
import { fetchUser } from '../actions'
import { connect } from 'react-redux'

const UserHeader = props => {

    useEffect(() => {
        console.log(props.fetchUser(props.userID))
    }, [])

    const { user } = props

    if(!user) {
        return null
    }    

    return (

        <div className="header">
           {user.name}
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return { user : state.users.find(user => user.id === ownProps.userID)}
}

export default connect(mapStateToProps, {fetchUser})(UserHeader)
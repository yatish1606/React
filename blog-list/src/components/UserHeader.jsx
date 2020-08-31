import React, { useEffect } from 'react'
import { fetchUser } from '../actions'
import { connect } from 'react-redux'

const UserHeader = props => {

    useEffect(() => {
        console.log(props.fetchUser(props.userID))
    }, [])

    const user = props.users.find(user => user.id === props.userID)

    if(!user) {
        return null
    }    

    return (

        <div className="header">
           {user.name}
        </div>
    )
}

const mapStateToProps = state => {
    return { users : state.users}
}

export default connect(mapStateToProps, {fetchUser})(UserHeader)
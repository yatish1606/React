import React from 'react'
import {SideBar} from './SideBar'
import {Tasks} from '../Tasks'

export const Content = () => {
    return (
        <section>
            <SideBar/>
            <Tasks/>
        </section>
    )
}
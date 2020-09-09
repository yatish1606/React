import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const one = () => <div>one</div>

const two = () => <div>two</div>

// exact={true} will tell React router to not display other paths that match a part of the provided path
// so a given path of '/a' will match all paths containing '/', like '/', '/b', and all will be displayed
// if exact argument is not provided

// dont use anchor tags for navigating when using React Router, as it will cause an entire new batch of requests 
// to be made, and will dump all javascript and Redux state data
// use <Link/> from react-router-dom instead, href === to
// React router prevents browser from maing a new request and stops from fetching a new index.html file so 
// page remains same, but path and url changes , and all <Route/> components inside <BrowserRouter/> re render

const App = () => {
    return (
        <div>
            <Router>
                <div>
                    <Route path="/" exact component={one}/>
                    <Route path="/two" component={two}/>
                </div>
            </Router>
        </div>
    )
}

export default App

// Types of react routers : 

// BrowserRouter => uses eveything after TLD (top level domain) or port as a path. 
// so localhost:3000/users will have path = '/users'

// HashRouter => uses everything after # as path
// so localhost:3000/#/users will have path = '/users'
// React Router adds a # after url

// MemoryRouter => 
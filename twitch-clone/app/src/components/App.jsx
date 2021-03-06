import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'

import StreamList from './streams/StreamList'
import StreamCreate from './streams/StreamCreate'
import StreamEdit from './streams/StreamEdit'
import StreamDelete from './streams/StreamDelete'
import StreamShow from './streams/StreamShow'
import Header from './commons/Header'
import '../css/app.css'
import history from '../history'

// exact={true} will tell React router to not display other paths that match a part of the provided path
// so a given path of '/a' will match all paths containing '/', like '/', '/b', and all will be displayed
// if exact argument is not provided

// dont use anchor tags for navigating when using React Router, as it will cause an entire new batch of requests 
// to be made, and will dump all javascript and Redux state data
// use <Link/> from react-router-dom instead, href === to
// React router prevents browser from making a new request and stops from fetching a new index.html file so 
// page remains same, but path and url changes , and all <Route/> components inside <BrowserRouter/> are re rendered

const App = () => {
    return (
        <div style={{minHeight:'100%'}}>
            <Router history={history}>
                <div style={{minHeight:'100vh'}}>
                    <Header/>
                    <Switch>
                        <Route path="/" exact component={StreamList}/>
                        <Route path="/streams/create" exact component={StreamCreate}/>
                        <Route path="/streams/edit/:id" exact component={StreamEdit}/>
                        <Route path="/streams/delete/:id" exact component={StreamDelete}/>
                        <Route path="/streams/:id" exact component={StreamShow}/>
                    </Switch>
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


// Routes for streams in README.md of streams folder inside /components
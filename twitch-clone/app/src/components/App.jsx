import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const one = () => <div>one</div>

const two = () => <div>two</div>


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
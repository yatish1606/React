import React, { useState } from 'react'
import {items, options, translationOptions} from './sampleInfo'
import Accordion from './components/Accordion'
import Search from './components/Search'
import Dropdown from './components/Dropdown'
import Translate from './components/Translate'
import FourOFour from './components/404'
import Route from './components/Route'
import Header from './components/Header'

const App = () => {

    const [selectedColor, setSelectedColor] = useState(options[0])
    const [showDropdown, setShowDropdown] = useState(false)

    const showComponent = () => {

        switch(window.location.pathname) {
            case '/' : 
                return <Accordion items={items}/>
            case '/search' : 
                return <Search/>
            case '/dropdown' : 
                return <Dropdown options={options} selected={selectedColor} setSelected={setSelectedColor} />
            case '/translate' : 
                return <Translate translationOptions={translationOptions}/>
            default : 
                return <FourOFour/>
        }
    }
    
    return (
        <div>
            
            {/* <button onClick={() => setShowDropdown(!showDropdown)}>Toggle Dropdown</button>
            {
                showDropdown ?
                <Dropdown
                    options={options}
                    selected={selectedColor}
                    setSelected={setSelectedColor}
                />
                : undefined
            }

            <p style={{color: selectedColor.value}}>This is sample text for testing color dropdown</p> */}
            <Header/>
            <Route path='/'>
                <Accordion items={items}/>
            </Route>
            <Route path='/search'>
                <Search/>
            </Route>
            <Route path='/dropdown'>
                <Dropdown options={options} selected={selectedColor} setSelected={setSelectedColor} />
            </Route>
            <Route path='/translate'>
                <Translate translationOptions={translationOptions}/>
            </Route>
            {/* {showComponent()} */}
        </div>
    )
}

export default App
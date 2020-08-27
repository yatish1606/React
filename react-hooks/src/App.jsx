import React, { useState } from 'react'
import {items, options, translationOptions} from './sampleInfo'
import Accordion from './components/Accordion'
import Search from './components/Search'
import Dropdown from './components/Dropdown'
import Translate from './components/Translate'

const App = () => {

    const [selectedColor, setSelectedColor] = useState(options[0])
    const [showDropdown, setShowDropdown] = useState(false)
    
    return (
        <div>
            {/* <Accordion
                items={items}
            /> */}
            {/* <Search/> */}

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

            <Translate translationOptions={translationOptions}/>
        </div>
    )
}

export default App
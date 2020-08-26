import React, { useState } from 'react'
import {items, options} from './sampleInfo'
import Accordion from './components/Accordion'
import Search from './components/Search'
import Dropdown from './components/Dropdown'

const App = () => {

    const [selectedColor, setSelectedColor] = useState(options[0])
    const [showDropdown, setShowDropdown] = useState(false)


    return (
        <div>
            {/* <Accordion
                items={items}
            /> */}
            {/* <Search/> */}

            <button onClick={() => setShowDropdown(!showDropdown)}>Toggle Dropdown</button>
            {
                showDropdown ?
                <Dropdown
                    options={options}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                />
                : undefined
            }
        </div>
    )
}

export default App
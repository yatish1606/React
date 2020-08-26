import React, { useState } from 'react'
import {items, options} from './sampleInfo'
import Accordion from './components/Accordion'
import Search from './components/Search'
import Dropdown from './components/Dropdown'

const App = () => {

    const [selectedColor, setSelectedColor] = useState(options[0])



    return (
        <div>
            {/* <Accordion
                items={items}
            /> */}
            {/* <Search/> */}
            <Dropdown
                options={options}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
            />
        </div>
    )
}

export default App
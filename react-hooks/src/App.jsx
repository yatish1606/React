import React from 'react'
import {items} from './sampleInfo'
import Accordion from './components/Accordion'
import Search from './components/Search'

const App = () => {
    return (
        <div>
            {/* <Accordion
                items={items}
            /> */}
            <Search/>
        </div>
    )
}

export default App
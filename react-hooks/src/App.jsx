import React from 'react'
import {items} from './sampleInfo'
import Accordion from './components/Accordion'

const App = () => {
    return (
        <div>
            <Accordion
                items={items}
            />
        </div>
    )
}

export default App
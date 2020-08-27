import React, {useState} from 'react'
import Dropdown from './Dropdown'
import Convert from './Convert'

const Translate = ({translationOptions}) => {

    const [language, setLanguage] = useState(translationOptions[0])
    const [textToTranslate, setTextToTranslate] = useState('')

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter text</label>
                    <input
                        value={textToTranslate}
                        onChange={(event) => setTextToTranslate(event.target.value)}
                    />
                </div>
            </div>
            <Dropdown
                label="Select a language"
                options={translationOptions}
                selected={language}
                setSelected={setLanguage}
            />
            <hr/>
            <h3 className="ui header">Output</h3>
            <Convert
                language={language}
                text={textToTranslate}
            />
        </div>
    )
}

export default Translate
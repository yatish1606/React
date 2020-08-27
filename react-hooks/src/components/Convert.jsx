import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {GOOGLE_TRANSLATE_API_KEY} from '../config'

const Convert = ({language, text}) => {

    const [translatedLanguage, setTranslatedLanguage] = useState('')
    const url = 'https://translation.googleapis.com/language/translate/v2'

    useEffect(() => {
        
        (async () => {
            const response = await axios.get(url, {
                params: {
                    q: text,
                    target: language.value,
                    key: GOOGLE_TRANSLATE_API_KEY
                }
            })
            setTranslatedLanguage(response.data.data.translations[0].translatedText)
        })()

    }, [language, text])

    return (
        <div>{translatedLanguage}</div>
    )
}

export default Convert
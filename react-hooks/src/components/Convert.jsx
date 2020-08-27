import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {GOOGLE_TRANSLATE_API_KEY} from '../config'

const Convert = ({language, text}) => {

    const [translatedLanguage, setTranslatedLanguage] = useState('')
    const [debouncedText, setDebouncedText] = useState('')
    const url = 'https://translation.googleapis.com/language/translate/v2'

    const timeoutID = setTimeout(() => {
        setDebouncedText(text)
    }, 500)

    useEffect(() => {

        (async () => {
            const response = await axios.post(url, {}, {
                params: {
                    q: text,
                    target: language.value,
                    key: GOOGLE_TRANSLATE_API_KEY
                }
            })
            setTranslatedLanguage(response.data.data.translations[0].translatedText)
        })()

        return () => {
            clearTimeout(timeoutID)
        }

    }, [language, debouncedText])

    return (
        <div>{translatedLanguage}</div>
    )
}

export default Convert
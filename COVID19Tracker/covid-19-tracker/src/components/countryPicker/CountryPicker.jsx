import React, {useState, useEffect} from 'react'
import { Select, FormControl} from '@material-ui/core' 
import styles from './CountryPicker.module.css';
import {fetchCountries} from '../../api'

const CountryPicker = ({handleCountryChange}) => {

    const [fetchedCountries, setFetchedCountries] = useState([])
    const [isOpen, toggleOpen] = useState(false)

    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchCountries())
        }

        fetchAPI()
    }, [setFetchedCountries])

    console.log(fetchedCountries)
    return (
        <FormControl className={styles.formControl}>
            <Select 
                open={isOpen} 
                defaultValue='' 
                onMouseEnter = { () => toggleOpen(true)}
                onMouseLeave = { () => toggleOpen(false)}
                
                onChange={(event) => {
                handleCountryChange(event.target.value)
                toggleOpen(false)
            }}>
                <option value=''>Global</option>
                {fetchedCountries.map((country, index) => <option key={index} value={country}>{country}</option>)}
            </Select>
        </FormControl>
    )
} 

export default CountryPicker
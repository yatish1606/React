import React from 'react';
import {Cards, Chart, CountryPicker} from './components'
import styles from './App.module.css'
import {fetchData} from './api'
import LogoImage from './images/virus.png'

export default class App extends React.Component {

  state = {
    data : {},
    country : ''
  }

  async componentDidMount () {
    const fetchedData = await fetchData()
    this.setState({data : fetchedData})
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country)
    this.setState({data : fetchedData, country: country})
    
  }

  render() {

    const {data, country} = this.state

    return (
      <div className={styles.container}>
        <div className={styles.titleDiv}>
          <span className={styles.logoTitle}>C </span>
          <img src={LogoImage} alt='covid' className={styles.imageLogo}/>
          <span className={styles.logoTitle}> VID-19 </span>
          <span className={styles.logoTitle}> Tracker </span>
        </div>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <Chart data={data} country={country} />
      </div>
    )
  }
}
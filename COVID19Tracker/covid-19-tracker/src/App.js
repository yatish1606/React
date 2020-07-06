import React from 'react';
import {Cards, Chart, CountryPicker} from './components'
import styles from './App.module.css'
import {fetchData} from './api'
import LogoImage from './images/virus.png'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const THEME = createMuiTheme({
    typography: {
      fontFamily: [
        'Nunito Sans',
        'Arial',
        'sans-serif'
      ].join(','),
      fontSize : 15,
      fontWeight : 800,
      color : '#fff'
    }
  });


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
      <ThemeProvider theme={THEME}>
      <div className={styles.container}>
        <div className={styles.titleDiv}>
          <span className={styles.logoTitle}>C</span>
          <img src={LogoImage} alt='covid' className={styles.imageLogo}/>
          <span className={styles.logoTitle}>VID-19</span>
          <span className={styles.logoTitle} style={{marginLeft:15}}> Tracker </span>
        </div>
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <Cards data={data} />
        
        <Chart data={data} country={country} />
      </div>
      </ThemeProvider>
    )
  }
}
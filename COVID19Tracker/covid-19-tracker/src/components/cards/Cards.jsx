import React from 'react'
import { Card, CardContent, Typography, Grid } from '@material-ui/core'
import styles from './Cards.module.css'
import CountUp from 'react-countup'
import cx from 'classnames'
import Fade from '@material-ui/core/Fade';
import Confirmed from '../../images/virus.png'
import Recovered from '../../images/recovered.png'
import Deaths from '../../images/deaths.png'

const Cards = ({data : {confirmed, recovered, deaths, lastUpdate}}) => {
    if(!confirmed) {
        return <h1>Loading..</h1>
    }
    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify='center'>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)} style={{backgroundColor:'#151313'}}>
                    <Fade in timeout={1000}>
                        <div>
                            
                                <CardContent>
                                    <div className={styles.cardImageDiv}>
                                        <img src={Confirmed} alt='confirmed' className={styles.cardImage}/>
                                    </div>
                                    <span className={styles.cardTitle}>INFECTED</span>
                                    <div className={styles.numbers}>
                                        <CountUp
                                            start={0}
                                            end={confirmed.value}
                                            duration={2}
                                            separator=','
                                        />
                                    </div>
                                    <div className={styles.updateDate}>{new Date(lastUpdate).toDateString()}</div>
                                    <h4 className={styles.description}>Number of active COVID-19 cases</h4>
                                </CardContent>
                           
                        </div>     
                    </Fade>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)} style={{backgroundColor:'#151313'}}>
                    <Fade in timeout={1000}>
                        <div>
                            
                                <CardContent>
                                    <div className={styles.cardImageDiv}>
                                        <img src={Recovered} alt='recovered' className={styles.cardImage}/>
                                    </div>
                                    <span className={styles.cardTitle}>RECOVERED</span>
                                    <div className={styles.numbers}>
                                        <CountUp
                                            start={0}
                                            end={recovered.value}
                                            duration={2}
                                            separator=','
                                        />
                                    </div>
                                    <div className={styles.updateDate}>{new Date(lastUpdate).toDateString()}</div>
                                    <h4 className={styles.description}>Number of recovered COVID-19 patients</h4>
                                </CardContent>
                           
                        </div>     
                    </Fade>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)} style={{backgroundColor:'#151313'}}>
                    <Fade in timeout={1000}>
                        <div>
                            
                                <CardContent>
                                    <div className={styles.cardImageDiv}>
                                        <img src={Deaths} alt='deaths' className={styles.cardImage}/>
                                    </div>
                                    <span className={styles.cardTitle}>DEATHS</span>
                                    <div className={styles.numbers}>
                                        <CountUp
                                            start={0}
                                            end={deaths.value}
                                            duration={2}
                                            separator=','
                                        />
                                    </div>
                                    <div className={styles.updateDate}>{new Date(lastUpdate).toDateString()}</div>
                                    <h4 className={styles.description}>Number of deaths due to COVID-19</h4>
                                </CardContent>
                           
                        </div>     
                    </Fade>
                </Grid>
            </Grid>
        </div>
    )
} 

export default Cards
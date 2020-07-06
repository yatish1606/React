import React from 'react'
import { Card, CardContent, Typography, Grid } from '@material-ui/core'
import styles from './Cards.module.css'
import CountUp from 'react-countup'
import cx from 'classnames'
import Fade from '@material-ui/core/Fade';
import Confirmed from '../../images/infected.png'

const Cards = ({data : {confirmed, recovered, deaths, lastUpdate}}) => {
    if(!confirmed) {
        return <h1>Loading..</h1>
    }
    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify='center'>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)} style={{backgroundColor:'#1E1C1C'}}>
                    <Fade in timeout={1000}>
                        <div>
                            <CardContent>
                                <div className={styles.cardImageDiv}>
                                    <img src={Confirmed} alt='confirmed' className={styles.cardImage}/>
                                </div>
                                <Typography gutterBottom className={styles.textSecondary}>Infected</Typography>
                                <Typography variant='h5'>
                                    <CountUp
                                        start={0}
                                        end={confirmed.value}
                                        duration={2}
                                        separator=','
                                    />
                                </Typography>
                                <Typography color='textSecondary'>{new Date(lastUpdate).toDateString()}</Typography>
                                <Typography variant='body2'>Number of active COVID-19 cases</Typography>
                            </CardContent>
                        </div>     
                    </Fade>
                </Grid>
                <Grid item component={Card}  xs={12} md={3} className={cx(styles.card, styles.recovered)}>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>Recovered</Typography>
                        <Typography variant='h5'>
                            <CountUp
                                start={0}
                                end={recovered.value}
                                duration={2}
                                separator=','
                            />
                        </Typography>
                        <Typography color='textSecondary'>{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant='body2'>Number of recovered COVID-19 cases</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card}  xs={12} md={3} className={cx(styles.card, styles.deaths)}>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>Deaths</Typography>
                        <Typography variant='h5'>
                            <CountUp
                                start={0}
                                end={deaths.value}
                                duration={2}
                                separator=','
                            />
                        </Typography>
                        <Typography color='textSecondary'>{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant='body2'>Number of deaths by COVID-19 </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
} 

export default Cards
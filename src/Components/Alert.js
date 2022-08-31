import React, {useCallback, useEffect, useState} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

export const Alert =  ({alert, alerts, setAlerts, colorScheme}) => {
    const [alertTimeInterval, setAlertTimeInterval] = useState(null);

    //Method to remove alert when trash icon is clicked
    const handleRemoveAlert = useCallback(() => {
            let newAlerts = alerts.filter((currentAlert) => currentAlert.id !== alert.id)
            setAlerts(newAlerts)
        
    },[alert.id, alerts, setAlerts])
    
    //Use Effect will remove the alert from state when the interval is complete
    useEffect(() => {
        const decrementAlertInterval = setInterval(() => {
            setAlertTimeInterval((currentTime) => {
                // current interval hasn't been given a value yet 
                // (give it alerts initial time limit value)
                if (currentTime === null){
                    return alert.timeLimit;
                }
                // current interval has reached 0
                // (remove alert from state)
                if (currentTime ===0 || alertTimeInterval === undefined){
                    let newAlerts = alerts.filter((currentAlert) => currentAlert.id !== alert.id)
                    setAlerts(newAlerts)
                    return;
                }
                // current interval has been interupted by other alerts
                // (provide the last value before interruption)
                if (currentTime === undefined){
                    return alertTimeInterval;
                }
                else {
                //decrement current value to display on alert card
                    return currentTime-1
                }
            })
        }, 1000);
       return () => clearInterval(decrementAlertInterval)
    },[ alerts, alert, setAlerts, alertTimeInterval])

    return (
        <Card key = {alert.id} style= {{ color: colorScheme}} variant="outlined">
            <CardContent>
                {alert.alertTitle && (
                <Typography variant = "h5">
                {alert.alertTitle}
               </Typography>
                )}
                <Typography  color="text.secondary" variant="body2" >
                    Time Limit: {alertTimeInterval}
                </Typography>                
                <Typography variant="body2">
                    {alert.text}
               </Typography>
               {alert.link && (
                <Button style= {{ color: colorScheme, marginLeft: '-0.25em'}} size="small" onClick = {() => window.open(`//${alert.link}`, '_blank', 'noopener, noreferrer')}>
                    Learn More
                </Button>
                )}
                <br/>
                 <Button style= {{color: colorScheme, marginLeft: '-0.75em'}} variant = "text" onClick={() => handleRemoveAlert(alert.id)}><DeleteIcon  fontSize = "small"/>Delete</Button>
            </CardContent>
         </Card>
    )
 }


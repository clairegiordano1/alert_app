import React from 'react'
import Typography from '@mui/material/Typography';
import {Alert} from './Alert'

export const AlertExample =  ({alerts, setAlerts}) => {
    return (
     <div style = {{display: 'grid', gridTemplateColumns: alerts.length <= 1 ? 'repeat(1, 1fr)' : alerts.length <= 2 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gridGap: '0.5em'}}>
      {alerts.length > 0 ? alerts.map((alert) => (
        <Alert key = {alert.id} alert = {alert} alerts = {alerts} setAlerts = {setAlerts} colorScheme = {alert.alertType === "error" ? 'red' : alert.alertType === 'warning' ? 'orange' : 
        alert.alertType === 'info' ? 'blue' : alert.alertType === 'success' ? 'green' : null} />
      )): (<Typography variant = "h6">No Alerts</Typography>)}
      </div>
    )
 }


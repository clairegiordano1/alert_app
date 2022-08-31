import React, {useCallback, useState} from 'react'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { AlertExample } from './AlertExample';
import { AlertComponent } from './AlertComponent';


//Custom hook to create a new alert
export const UseAlertReducer = (alertProperties, alerts) => {
     alerts = alerts.concat(alertProperties);
     alerts = alerts.sort((a,b) => a.timeLimit < b.timeLimit)
    return alerts;  
};

 export const AlertManager =  () => {
  const [alerts, setAlerts] = useState([])
  const [viewForm, setViewForm] = useState(false)

//Method to open form to create new alert
  const handleOpenForm = useCallback(() => {
    setViewForm(true);
  },[]);

   return (
    <>
     <div style = {{display: 'flex'}}>
        <div style = {{width: '25%', margin: '2em 0 0 2em', float: 'left'}}>
            <Button  variant="outlined" onClick={handleOpenForm}>
            + Create Alert
            </Button>
            </div>
        <Card style = {{width: '70%',  marginTop: '2em'}} >
            <AlertExample alerts = {alerts} setAlerts = {setAlerts} />
        </Card>
      </div>
      <AlertComponent viewForm = {viewForm} setViewForm = {setViewForm} alerts= {alerts} setAlerts = {setAlerts} />
     </>
    )
 }


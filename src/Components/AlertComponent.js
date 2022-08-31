import React, {useCallback, useState} from 'react'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Typography } from '@mui/material';
import {UseAlertReducer} from './AlertManager'

 export const AlertComponent =  ({viewForm, setViewForm, alerts, setAlerts}) => {
  const [alertTitle, setAlertTitle] = useState('')
  const [alertType, setAlertType] = useState('')
  const [alertText, setAlertText] = useState('')
  const [alertTimeLimit, setAlertTimeLimit] = useState('')
  const [alertLink, setAlertLink] = useState('')
  const [errorResponse, setErrorResponse] = useState('')

//Method to close or cancel form to create new alert
  const handleCloseForm = useCallback(() => {
    setViewForm(false);
  },[setViewForm]);

  //Method to submit form to create new alert
    const handleSubmitForm = useCallback(() => {
        if (alertType === '' ){
            setErrorResponse('Please select an alert type')
            return;
        }
        //Alert time limit must be a number, if it's a string set an error response
        if (isNaN(alertTimeLimit)) {
            setErrorResponse('Please enter a valid number for alert time')
            return;
        }   
        let newAlertProperties = {
            alertTitle: alertTitle,
            timeLimit: alertTimeLimit,
            text: alertText,
            link: alertLink,
            alertType: alertType,
            id: alerts.length === 0 ?  0 : alerts.length,
        }
        let newAlerts = UseAlertReducer(newAlertProperties, alerts, setAlerts, setViewForm)
        setAlerts(newAlerts)
        setAlertTitle('')
        setAlertTimeLimit('')
        setAlertText('')
        setAlertLink('')
        setAlertType('')
        setViewForm(false)
        return;

  },[alertTitle, alertTimeLimit, alertText, alertLink, alertType, alerts, setViewForm, setAlerts]);
   
   return (
    <>
      <Dialog open={viewForm} onClose={handleCloseForm}>
        <DialogTitle>Create New Alert Type</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="alertTitle"
            value = {alertTitle}
            onChange= {(event) => setAlertTitle(event.target.value)}
            label="Title"
            type="string"
            fullWidth
          />
        <TextField
            margin="dense"
            id="timeLimit"
            value = {alertTimeLimit}
            onChange= {(event) => setAlertTimeLimit(event.target.value)}
            label="Time Limit (in seconds)"
            type="string"
            fullWidth
          />
        <TextField
            margin="dense"
            id="text"
            value = {alertText}
            onChange= {(event) => setAlertText(event.target.value)}
            label="Text"
            type="string"
            fullWidth
          />
        <TextField
            margin="dense"
            id="link"
            value = {alertLink}
            onChange= {(event) => setAlertLink(event.target.value)}
            label="Link"
            type="string"
            fullWidth
          />
        <InputLabel style = {{margin: '0.5em 0 0.5em 0'}}>Alert Type</InputLabel>
        <Select
            value={alertType}
            fullWidth
            label="Alert Type"
            onChange={(event) => setAlertType(event.target.value)}
            required = {true}
            style= {{color: alertType === "error" ? 'red' : alertType === 'warning' ? 'orange' : alertType === 'info' ? 'blue' : alertType === 'success' ? 'green' : null}}
        >
            <MenuItem style= {{color: 'red'}} value={'error'}>Error</MenuItem>
            <MenuItem style= {{color: 'orange'}} value={'warning'}>Warning</MenuItem>
            <MenuItem style= {{color: 'blue'}} value={'info'}>Info</MenuItem>
            <MenuItem style= {{color: 'green'}}value={'success'}>Success</MenuItem>
        </Select>
        {errorResponse && <Typography style = {{color: 'red'}}>{errorResponse}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button onClick={handleSubmitForm}>Submit</Button>
        </DialogActions>
      </Dialog>
     </>
    )
 }


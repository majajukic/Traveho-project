import React from 'react'
import {TextField, Grid, InputAdornment, IconButton} from '@material-ui/core';
import {Visibility, VisibilityOff} from '@material-ui/icons';

const Input = ({name, handleChange, label, half, autoFocus, type, handleShowPassword, error }) => {
    return (
       <Grid item xs={12} sm={half ? 6 : 12}>
           <TextField 
               name={name}
               onChange={handleChange}
               variant="outlined"
               required
               fullWidth
               label={label}
               autoFocus={autoFocus}
               type={type}
               autoComplete="off"
               error={error !== '' ? error : null}
               helperText={error !== '' ? error : null}
               InputProps={name === "password" ? {
                   endAdornment: (
                       <InputAdornment position="end">
                           <IconButton onClick={handleShowPassword}/>
                           { type === "password" ? <Visibility /> : <VisibilityOff />}
                       </InputAdornment>
                   )
                } : null}
           />
       </Grid>
    )
}

export default Input;

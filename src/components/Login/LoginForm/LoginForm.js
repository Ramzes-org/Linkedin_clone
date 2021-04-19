import React from 'react';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';

function RegistrationForm({ values, classes, handleChange, handleClickShowPassword, handleMouseDownPassword, submit }) {
  return (
    <form>
      {values.checkIn &&
        <TextField
          error={!!values.nameError}
          helperText={values.nameError}
          id="outlined-basic-name"
          label="Full name"
          variant="outlined"
          value={values.name}
          onChange={handleChange('name')}
          className={clsx(classes.margin, classes.textField)}
        />}
      {values.checkIn &&
        <TextField
          id="outlined-basic-profilePic"
          label="Profile pic URL (optional)"
          variant="outlined"
          value={values.profilePic}
          onChange={handleChange('profilePic')}
          className={clsx(classes.margin)}
        />
      }
      <TextField
        error={!!values.emailError}
        helperText={values.emailError}
        id="outlined-basic-email"
        label="Email"
        variant="outlined"
        value={values.email}
        onChange={handleChange('email')}
        className={clsx(classes.margin, classes.textField)}
      />

      <FormControl
        error={!!values.passwordError}
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={73}
        />
        <FormHelperText error children={values.passwordError} />
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={submit}
      >
        {values.checkIn ? 'Register Now': 'Sing in'}
      </Button>
    </form>
  )
}

export default RegistrationForm

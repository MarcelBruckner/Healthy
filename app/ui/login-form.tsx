"use client";

import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/app/lib/actions";
import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useState } from "react";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const { pending } = useFormStatus();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };


  return (
    <form action={dispatch} >
      <Grid container spacing={2} >
        <Grid item xs={12}>
          <FormControl sx={{ width: '100%' }} variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              name="password"
              error={!!errorMessage}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </Grid>
        <Grid item xs={true} >
          <Typography color="red">
            {errorMessage}
          </Typography>
        </Grid>
        <Grid item xs={4} display="flex" justifyContent="flex-end" >
          <Button id="login" type="submit" variant="contained" aria-disabled={pending}>
            Log In
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}


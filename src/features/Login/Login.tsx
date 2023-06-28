import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import styled from "@emotion/styled";
import {useAppDispatch, useAppSelector} from "../../state/hooks";
import {loginTC} from "../../state/auth-reducer";
import {Navigate} from "react-router-dom";


export const Login = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
            if (!values.email) {
                errors.email = 'Email is required';
            } else if ((!regexEmail.test(values.email))) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Password is required';
            } else if (values.password.trim().length < 3) {
                errors.password = 'the password cannot be shorter than 6 characters';
            }

            return errors;
        },
        onSubmit: values => {
            formik.resetForm()
            dispatch(loginTC(values))
        },
    })

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>

            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}> here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <TextField label="Email" margin="normal"
                                   {...formik.getFieldProps('email')}/>
                        {(formik.touched.email && formik.errors.email)
                            ? <ErrorMessage>{formik.errors.email}</ErrorMessage>
                            : null}
                        <TextField type="password" label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps('password')}/>
                        {(formik.touched.password && formik.errors.password)
                            ? <ErrorMessage>{formik.errors.password}</ErrorMessage>
                            : null}
                        <FormControlLabel label={'Remember me'}
                                          control={<Checkbox color={'secondary'}
                                                             checked={formik.values.rememberMe}
                                                             {...formik.getFieldProps('rememberMe')}
                                          />}/>
                        <Button type={'submit'} variant={'contained'} color={'secondary'}>
                            Login
                        </Button>
                    </FormGroup>
                </form>
            </FormControl>

        </Grid>
    </Grid>
}

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
`


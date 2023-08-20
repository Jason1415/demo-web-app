import React, { useState } from 'react';
import Button from '@mui/material/Button/Button';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { AppBar } from '@mui/material';
import Screen from '../component/Screen';
import AuthThunk from '../../store/auth/thunk';
import { useAppDispatch, useAppSelector } from '../../@types/redux';

const Login = () : JSX.Element => {
    const isLoggingIn = useAppSelector(x => x.auth.isLoggingIn);
    const dispatch = useAppDispatch();

    const [isLoading, setLoading] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const manualLogin = async () => {
        setLoading(true);
        dispatch(AuthThunk.manualLogIn({ username, password }));
        setPassword('');
    };

    const onUsernameChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setUsername(e.target.value);
    const onPasswordChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setPassword(e.target.value);

    const enterPressed = (event : React.KeyboardEvent<HTMLDivElement>) => {
        if (username && password) {
            if (event.key === 'Enter') {
                manualLogin();
            }
        }
    };

    return (
        <Screen isPadded={false}>
            <AppBar position='static' className={'wsnw h40 fdr aic'} elevation={0}>
                <Typography variant='h6' className={'cw'}>
                    LOGIN
                </Typography>
            </AppBar>
            <div className={'flx1 fdr posr'}>
                {
                    isLoggingIn ? (
                        <div className={'flx1 fdc aic jcc'}>
                            <CircularProgress size={80}/>
                        </div>
                    ) : (
                        <div className={'flx1 fdc aic jcc'}>
                            <Paper className={'fdc w500 zi2 ais'}>
                                <Toolbar color={'primary'} className={'bcpd'}>
                                    <Typography variant='h6' className={'flx1 cw'}>
                                        Please Log in
                                    </Typography>
                                </Toolbar>
                                <div className={'p20 fdc aic'}>
                                    <div className={'fdr p5 wfill'}>
                                        <TextField className={'wfill'} label={'Username'} name={'username'} value={username} onChange={onUsernameChange} />
                                    </div>
                                    <div className={'fdr p5 wfill'}>
                                        <TextField className={'wfill'} label={'Password'} name={'password'} value={password} type={'password'} onChange={onPasswordChange} onKeyDown={enterPressed} />
                                    </div>
                                    <div className={'fdr p5 wfill mb5'}>
                                        <Button
                                            className={'flx1 br25'}
                                            variant='contained'
                                            color='secondary'
                                            onClick={manualLogin}
                                            disabled={!username || !password || isLoading}
                                        >
                                            LOGIN
                                        </Button>
                                    </div>
                                </div>
                            </Paper>
                        </div>
                    )
                }
            </div>
        </Screen>
    );
};

export default Login;

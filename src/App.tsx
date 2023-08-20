import { useEffect } from 'react';
import NavBar from './modules/root/NavBar';
import PageRoutes from './modules/root/Routes';
import { useAppDispatch, useAppSelector } from './@types/redux';
import Login from './modules/root/Login';
import './app.scss';
import { initializeInterceptor } from './service/http';
import Loader from './modules/component/display/Loader';
import AuthActions from './store/auth/actions';
import GeneralThunk from './store/general/thunk';
import AuthThunk from './store/auth/thunk';
import { IUserToken } from './@types/model/auth/userToken/userToken';
import * as localStorageService from './service/localStorageService';
import { ThemeProvider } from '@mui/material';
import theme from './materialTheme';



const App = () : JSX.Element => {
    const dispatch = useAppDispatch();
    const isLoggingIn = useAppSelector<boolean>(x => x.auth.isLoggingIn);
    const session = useAppSelector<null | IUserToken>(x => x.auth.session);

    const onUnauthenticated = (error : any) : void => {
        initializeInterceptor('', onUnauthenticated, onUnauthorized, onConnectionError);
        dispatch(GeneralThunk.showErrorSnackbar({
            defaultMessage: 'Unauthenticated.',
            e: error,
        }));

        dispatch(AuthThunk.logOut());
    };

    const onUnauthorized = (error : any) : void => {
        dispatch(GeneralThunk.showErrorSnackbar({
            defaultMessage: 'Insufficient rights.',
            e: error,
        }));
    };

    const onConnectionError = () : void => {
        dispatch(GeneralThunk.showErrorSnackbar({
            defaultMessage: 'Connection error.',
        }));
    };

    useEffect(() => {
        dispatch(AuthActions.setLoggingIn(true));
        localStorageService.onSessionChanged(async (user : IUserToken | null) => {
            if (user) { /* Logged In */
                initializeInterceptor(user.token, onUnauthenticated, onUnauthorized, onConnectionError);
                dispatch(AuthActions.setSession(user));
                dispatch(AuthActions.setLoggedIn(true));
                dispatch(AuthActions.setLoggingIn(false));

            } else { /* Logged Out or Not yet logged in */
                initializeInterceptor('', onUnauthenticated, onUnauthorized, onConnectionError);
                dispatch(AuthActions.setLoggedIn(false));
                dispatch(AuthActions.setSession(null));
                dispatch(AuthActions.setLoggingIn(false));
            }
        });

    }, []);

    return (
      <ThemeProvider theme={theme}>
          {
            isLoggingIn ? (
              <Loader/>
            ) : 
            <div className={'fdc hfill bcp oh'}>
                <NavBar/>
                <div>
                    <PageRoutes/>
                </div>
            </div>
            }
        </ThemeProvider>
    );
};

export default App;
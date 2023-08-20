import GeneralThunk from '../general/thunk';
import AuthActions from './actions';
import AuthHttpService from '../../service/http/authHttpService';
import dataActions from '../data/actions';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkApi } from '../../@types/redux';
import { IUserToken } from '../../@types/model/auth/userToken/userToken';

export default class AuthThunk {

    /**
     * Performs log out request with API then sets the auth state accordingly.
     */
    public static logOut = createAsyncThunk<
        void,
        undefined,
        ThunkApi>(
            'AUTH_LOG_OUT',
            async (params, thunkApi) => {
                try {
                    await AuthHttpService.logout();

                    thunkApi.dispatch(GeneralThunk.showSuccessSnackbar('Success'));

                    thunkApi.dispatch(AuthActions.logout());
                    thunkApi.dispatch(dataActions.reset());
                } catch (e) {
                    thunkApi.dispatch(GeneralThunk.showErrorSnackbar({ defaultMessage: 'An error occurred while logging out.', e }));
                }
            },
        );

    /**
     * Performs log in request with API then sets the interceptor (using auth token) and auth state accordingly. Kicks off
     * the setup for local storage service to store the session and, in turn, firing its callback (that is set during app
     * init).
     *
     * @param username
     * @param password
     */
    public static manualLogIn = createAsyncThunk<
        IUserToken | null,
        {
            username : string;
            password : string;
        },
        ThunkApi>(
            'AUTH_MANUAL_LOGIN',
            async (params, thunkApi) => {
                try {
                    thunkApi.dispatch(AuthActions.setLoggingIn(true));

                    const res = await AuthHttpService.logInManual(params.username, params.password);

                    thunkApi.dispatch(GeneralThunk.showSuccessSnackbar('Success'));

                    return res.data;
                } catch (e) {
                    thunkApi.dispatch(AuthActions.setLoggingIn(false));
                    thunkApi.dispatch(GeneralThunk.showErrorSnackbar({ defaultMessage: 'An error occurred while logging in.', e }));
                    return null;
                } finally {
                    thunkApi.dispatch(AuthActions.setLoggingIn(false));
                }
            },
        );
}

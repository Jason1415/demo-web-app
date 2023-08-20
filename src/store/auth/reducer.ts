import AuthActions from './actions';
import { createReducer } from '@reduxjs/toolkit';
import { IUserToken } from '../../@types/model/auth/userToken/userToken';

export interface IAuthState {
    isLoggedIn : boolean;
    session : null | IUserToken;
    token : string;
    isLoggingIn : boolean;
}

const initialState = {
    isLoggedIn: false,
    session: null,
    token: '',
    isLoggingIn: false,
};

const authReducer = createReducer<IAuthState>(initialState, (builder) => {
    builder.addCase(AuthActions.setSession, (state, action) => {
        state.session = action.payload;
    });
    builder.addCase(AuthActions.setLoggingIn, (state, action) => {
        state.isLoggingIn = action.payload;
    });
    builder.addCase(AuthActions.setToken, (state, action) => {
        state.token = action.payload;
    });
    builder.addCase(AuthActions.logout, () => {
        return initialState;
    });
});

export default authReducer;

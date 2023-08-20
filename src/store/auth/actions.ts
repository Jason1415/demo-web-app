import { createAction } from '@reduxjs/toolkit';
import { IUserToken } from '../../@types/model/auth/userToken/userToken';
import { withPayloadType } from '../../service/helper/reduxHelper';

export default class AuthActions {
    public static setSession = createAction('AUTH_SET_SESSION', withPayloadType<IUserToken | null>());
    public static setLoggedIn = createAction('AUTH_SET_LOGGED_IN', withPayloadType<boolean>());
    public static setLoggingIn = createAction('AUTH_SET_LOGGING_IN', withPayloadType<boolean>());
    public static setToken = createAction('AUTH_SET_TOKEN', withPayloadType<string>());
    public static logout = createAction('AUTH_LOGOUT');
}

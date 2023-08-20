import axios, { AxiosPromise } from 'axios';
import { IUserToken } from '../../@types/model/auth/userToken/userToken';


export default class AuthHttpService {
    public static logInManual = (username : string, password : string) : AxiosPromise<IUserToken> => {
        console.log(API_URL, 'url');
        return axios.post(`${API_URL}api/Authorisation/LogIn`, {
            username,
            password,
        });
    }

    public static getSession = () : AxiosPromise<IUserToken> => {
        return axios.get(`${API_URL}api/Authorisation/GetSession`);
    }

    public static logout = () : AxiosPromise => {
        return axios.get(`${API_URL}api/Authorisation/LogOut`);
    }
}

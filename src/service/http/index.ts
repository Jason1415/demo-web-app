import axios from 'axios';

let requestInterceptorNum = 0;
let responseInterceptorNum = 0;

export function initializeInterceptor(token : string, onUnauthenticated : (error : any) => void, onUnauthorized : (error : any) => void, onConnectionError : () => void) : void {
    axios.interceptors.request.eject(requestInterceptorNum);
    axios.interceptors.response.eject(responseInterceptorNum);

    if (token) {
        requestInterceptorNum = axios.interceptors.request.use((config) => {
            config.headers['Authorization'] = 'Bearer ' + token;
            return config;
        });

        responseInterceptorNum = axios.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                if (!!error.response && error.response.status === 401) {
                    onUnauthenticated(error.response.data);
                    return Promise.reject(error.response);
                } else if (!!error.response && error.response.status === 403) {
                    onUnauthorized(error.response.data);
                    return Promise.reject(error.response);
                }

                if (!error || !error.response) {
                    onConnectionError();
                    return Promise.reject();
                }

                return Promise.reject(error.response);
            }
        );
    }
}

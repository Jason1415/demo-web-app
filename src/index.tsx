import React from 'react';
import ReactDOM from 'react-dom/client';
import './app.scss';
import App from './App';
import { SnackbarOrigin, SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import store from './store';

const snackBarProviderAnchor : SnackbarOrigin = {
    vertical: 'bottom',
    horizontal: 'right',
};

const AppRoot = () : JSX.Element => {

    const title = 'NM Dashboard';
    document.title = title;

    return (
        <Provider store={store}>
            <HashRouter>
                <SnackbarProvider
                    maxSnack={4}
                    anchorOrigin={snackBarProviderAnchor}>
                    <App />
                </SnackbarProvider>
            </HashRouter>
        </Provider>
    );
};

const rootDomElement = document.getElementById('root');

if (rootDomElement) {
    ReactDOM.createRoot(rootDomElement).render(<AppRoot/>);
}

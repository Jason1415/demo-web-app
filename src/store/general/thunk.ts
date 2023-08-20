import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkApi } from '../../@types/redux';
import generalActions from './actions';

export default class GeneralThunk {
    /**
     * Adds an error snackbar to the queue. Attempts to retrieve the error message from the API, falling back to the default
     * message if the API returns no such thing.
     * @param defaultMessage
     * @param e
     */
    public static showErrorSnackbar = createAsyncThunk<
        void,
        {
            defaultMessage : string;
            e ? : any;
        },
        ThunkApi>(
            'SHOW_ERROR_SNACKBAR',
            async (params, thunkApi) => {
                let errorMessage = params.defaultMessage;

                if (params.e && params.e.response && params.e.response.data && params.e.response.data.hasError && params.e.response.data.message) {
                    errorMessage = params.e.response.data.message;
                }

                if (params.e && params.e.data && params.e.data.hasError && params.e.data.message) {
                    errorMessage = params.e.data.message;
                }

                thunkApi.dispatch(generalActions.enqueueSnackbar({
                    message: errorMessage,
                    options: {
                        variant: 'error',
                    },
                }));
            },
        );

    /**
     * Adds a success snackbar to the queue.
     * @param message
     */
    public static showSuccessSnackbar = createAsyncThunk<
        void,
        string,
        ThunkApi>(
            'SHOW_SUCCESS_SNACKBAR',
            async (message, thunkApi) => {
                thunkApi.dispatch(generalActions.enqueueSnackbar({
                    message,
                    options: {
                        variant: 'success',
                    },
                }));
            },
        );

    /**
     * Adds a warning snackbar to the queue.
     * @param message
     */
    public static showWarningSnackbar = createAsyncThunk<
        void,
        string,
        ThunkApi>(
            'SHOW_WARNING_SNACKBAR',
            async (message, thunkApi) => {
                thunkApi.dispatch(generalActions.enqueueSnackbar({
                    message,
                    options: {
                        variant: 'warning',
                    },
                }));
            },
        );

    /**
     * Adds an info snackbar to the queue.
     * @param message
     */
    public static showInfoSnackbar = createAsyncThunk<
        void,
        string,
        ThunkApi>(
            'SHOW_INFO_SNACKBAR',
            async (message, thunkApi) => {
                thunkApi.dispatch(generalActions.enqueueSnackbar({
                    message,
                    options: {
                        variant: 'info',
                    },
                }));
            },
        );
}

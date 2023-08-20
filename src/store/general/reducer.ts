import { createReducer } from '@reduxjs/toolkit';
import { ISnackbarNotification } from '../../@types/redux';
import GeneralActions from '../../store/general/actions';

export interface IGeneralState {
    notifications : Array<ISnackbarNotification>;
}

const initialState = {
    notifications: [],
};

const generalReducer = createReducer<IGeneralState>(initialState, (builder) => {
    builder.addCase(GeneralActions.enqueueSnackbar, (state, action) => {
        state.notifications.push(action.payload);
    });
    builder.addCase(GeneralActions.removeSnackbar, (state, action) => {
        state.notifications.filter(notification => notification.key !== action.payload);
    });
});

export default generalReducer;

import { createReducer } from '@reduxjs/toolkit';
import DataActions from './actions';

export interface IDataState {
    isLoading : boolean;
}

const initialState = {
    isLoading: false,
};

const dataReducer = createReducer<IDataState>(initialState, (builder) => {
    builder.addCase(DataActions.setIsLoading, (state, action) => {
        state.isLoading = action.payload;
    });

    builder.addCase(DataActions.reset, () => {
        return initialState;
    });
});

export default dataReducer;

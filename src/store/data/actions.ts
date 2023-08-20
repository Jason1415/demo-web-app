import { createAction } from '@reduxjs/toolkit';
import { withPayloadType } from '../../service/helper/reduxHelper';

export default class DataActions {
    public static setIsLoading = createAction('DATA_SET_LOADING', withPayloadType<boolean>());
    public static reset = createAction('DATA_RESET');
}

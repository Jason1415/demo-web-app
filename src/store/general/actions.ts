import { createAction } from '@reduxjs/toolkit';
import { INotification } from '../../@types/redux';
import { withPayloadType } from '../../service/helper/reduxHelper';

export default class GeneralActions {
    public static enqueueSnackbar = createAction(
        'ENQUEUE_SNACKBAR',
        (notification : INotification) => {
            return {
                payload: {
                    key: new Date().getTime() + Math.random(),
                    ...notification,
                },
            };
        });

    public static removeSnackbar = createAction(
        'REMOVE_SNACKBAR',
        withPayloadType<number>(),
    );

    public static setNavDrawer = createAction('SET_NAVIGATION_DRAWER', withPayloadType<boolean>());
}

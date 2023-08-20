import { CircularProgress } from '@mui/material';
import React from 'react';

const Loader = () : React.ReactElement => {
    return (
        <div className={'posa post0 posr0 posb0 posl0 aic jcc zi1000'}>
            <div className={'posr aic jcc h50 w50'}>
                <CircularProgress color={'primary'} className={'posa post0 posr0 posb0 posl0'} size={50} />
            </div>
        </div>
    );
};

export default Loader;

import React, { ReactNode } from 'react';
import Divider from '@mui/material/Divider/Divider';
import Loader from './display/Loader';

interface IScreenProps {
    isPadded ?: boolean;
    isScrollable ?: boolean;
    actions ?: ReactNode;
    isLoading ?: boolean;
    backgroundColor ?: string;
    children ?: React.ReactNode;
}

const Screen = (props : IScreenProps) : React.ReactElement => {
    const {
        isLoading = false,
        isPadded = true,
        isScrollable = false,
        actions,
        backgroundColor = '',
        children,
    } = props;

    return (
        <div className={'flx1 fdr h100vh bcg0'}>
            {   
                isLoading &&
                <Loader/>
            }
            <div className={`flx1 fdc ${isPadded ? 'p20' : ''} ${isScrollable ? 'oya' : ''} ${backgroundColor}`}>
                {children}
                {!!actions && <Divider />}
                {actions}
            </div>
        </div>
    );
};

export default Screen;

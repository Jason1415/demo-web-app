import { IconButton, Icon, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar/Toolbar';
import { useAppSelector } from '../../@types/redux';

const NavBar = () : JSX.Element => {
    const loggedIn = useAppSelector(x => x.auth.isLoggedIn);
    const firstName = useAppSelector(x => x.auth.session?.user.firstName);

    /*================================================================================================================
     *                                                  Effects
     * ==============================================================================================================*/


    /*================================================================================================================
     *                                                  Async Methods
     * ==============================================================================================================*/

    

    /*================================================================================================================
     *                                                  Handler Methods
     * ==============================================================================================================*/

    

    /*================================================================================================================
     *                                                  Memos
     * ==============================================================================================================*/

    
    /*================================================================================================================
     *                                                  Render Methods
     * ==============================================================================================================*/


    return (
        <AppBar position='static' className={'wsnw mxh52 h60 bcp'} elevation={0}>
            <Toolbar variant='regular'>
                <span className={'flx1'} />
                <div className={'fdr jcfe aic'}>
                    {
                        loggedIn &&
                        <Typography color='inherit' variant='h6'>
                            {`Welcome, ${firstName}`}
                        </Typography>
                    }
                    
                    <div className={'w20'} />
                    <div>
                        <IconButton className={'cct'}>
                            <Icon>menu</Icon>
                        </IconButton>
                    </div>
                    <div className={'w20'} />
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;

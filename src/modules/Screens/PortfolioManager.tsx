import React, { useEffect } from 'react';
import Screen from '../component/Screen';
import TemplateProfile from '../../../assets/images/TemplateProfile.png';
import ProfileWhite from '../../../assets/images/ProfileWhite.png';
import { Button, Typography } from '@mui/material';
import { AiOutlineLine } from 'react-icons/ai';

const PortfolioManager = () : JSX.Element => {
    
    const style = {
        //Not working
        backgroundImage: `url(${TemplateProfile})`,
        height: "100px",
        backgroundSize: "cover",
    }

    /*================================================================================================================
     *                                                  Effects
     * ==============================================================================================================*/

    useEffect(() => {
        loadData();
    }, []);

    /*================================================================================================================
     *                                                  Async Methods
     * ==============================================================================================================*/

    const loadData = async () : Promise<void> => {
    };

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
        <Screen isPadded={false} isScrollable>
            <div className={'fdc tttt bcp posr'} style={style}>
                <div className={'wfill jcfe'}>
                    <div className={'mr20 fdc bcp aife pr16'}>
                        <Button className={'p0 mb10 m0'}>
                            <Typography className={'cw fsstitle'}>About</Typography>
                        </Button>
                        <Button className={'p0 mb10 m0'}>
                            <Typography className={'cw fsstitle'}>Projects</Typography>
                        </Button>
                        <Button className={'p0 mb10 m0'}>
                            <Typography className={'cw fsstitle'}>Contact</Typography>
                        </Button>
                    </div>
                </div>
                <div className={'wfill'}>
                    <Typography className={'ftitle pl50 cw'}>
                        I'm Jason le Roux.
                    </Typography>
                    <div>
                        <div className={'fdr pl40'}>
                            <div className={'aic cw'}>
                                <AiOutlineLine preserveAspectRatio='none' size={100} style={{height:"5px"}}/>
                            </div>
                            <Typography className={'fstitle cct'}>
                                A Full Stack Developer
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'fdc bcp h100vh aic'}>
                <div className={'pt80'}>
                    <Typography  className={'ftitle cw'}>
                        About
                    </Typography>
                </div>
                <div className={'pt10 fdr'}>
                    <div className={'aic cctl'}>
                        <AiOutlineLine preserveAspectRatio='none' size={100} style={{height:"5px"}}/>
                    </div>
                    <Typography  className={'fstitle cct'}>
                        Some info about me
                    </Typography>
                    <div className={'aic cctl'}>
                        <AiOutlineLine preserveAspectRatio='none' size={100} style={{height:"5px"}}/>
                    </div>
                    
                </div>
                <div className={'fdr pt50'}>
                    <div className={''}>
                        <img src={ProfileWhite} alt={'ee'} style={{width:'500px', height:'500px'}}/>
                    </div>
                    <div className={'pt20'}>
                        <Typography  className={'fstitle cctl w400 pl50'}>
                        I am hard-working and strive to learn continually. In my spare time, I tend to lead a busy life.
                        I enjoy languages and am currently learning French. I love to play games.<br/><br/><br/>
                        I have also developed quite a love for physics and mathematics and regularly spend 
                        time studying mathematical/physical topics. <br/><br/><br/>Further, I offer tutoring in programming, 
                        and lastly, I spend what brain power I have left on developing my own games or learning
                        something new in the tech world; currently Salesforce.
                        </Typography>
                    </div>
                </div>
            </div>
        </Screen>
    );

};

export default PortfolioManager;

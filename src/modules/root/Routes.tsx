import React, { Suspense } from 'react';
import Screen from '../component/Screen';
import Loader from '../component/display/Loader';
import PortfolioManager from '../Screens/PortfolioManager';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';

const PageRoutes = () : JSX.Element => {
    return (
        <Suspense fallback={<Screen><Loader/></Screen>}>
            <div>
                <Routes>
                    <Route path="/" element={<PortfolioManager />} />
                </Routes>
            </div>
        </Suspense>
    );
};

export default PageRoutes;

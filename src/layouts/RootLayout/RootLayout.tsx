import { FunctionComponent } from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import { Footer } from '../../components/Footer/Footer';
import { Outlet } from 'react-router-dom';

export const RootLayout: FunctionComponent = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}
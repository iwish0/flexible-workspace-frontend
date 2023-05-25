import { FunctionComponent } from 'react';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { Outlet } from 'react-router-dom';

export const RootLayout: FunctionComponent = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}
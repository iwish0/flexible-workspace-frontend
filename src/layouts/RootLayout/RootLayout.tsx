import { FunctionComponent } from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import { Footer } from '../../components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import SnackbarProvider from '../../shared/context/snackbarProvider';

export const RootLayout: FunctionComponent = () => {
  return (
    <>
      <Navbar />
      <SnackbarProvider>
        <Outlet />
      </SnackbarProvider>
      <Footer />
    </>
  );
};

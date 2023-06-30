import { AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from '@azure/msal-react';
import SnackbarProvider from '../../shared/context/snackbarProvider';
import { SignInButton } from '../../components/SignIn/SignIn';
import { Navbar } from '../../components/Navbar/Navbar';
import { Footer } from '../../components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import { FunctionComponent } from 'react';

export const RootLayout: FunctionComponent = (): JSX.Element => {
  const isAuthenticated: boolean = useIsAuthenticated();
  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <UnauthenticatedTemplate>
        <SignInButton />
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <SnackbarProvider>
          <Outlet />
        </SnackbarProvider>
        {/* <Footer /> */}
      </AuthenticatedTemplate>
    </>
  );
};

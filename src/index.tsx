import SnackbarProvider from './shared/context/snackbarProvider';
import { LOCALE } from './shared/constants/locale.constant';
import { NextUIProvider } from '@nextui-org/react';
import { registerLocale } from 'react-datepicker';
import { IconlyProvider } from 'react-iconly'
import ReactDOM from 'react-dom/client';
import { fr } from 'date-fns/locale';
import { theme } from './theme';
import { App } from './App';
import React from 'react';
import './index.css';
// Scripts used for the authentication
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authConfig';

registerLocale(LOCALE, fr);
const msalInstance = new PublicClientApplication(msalConfig);
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <NextUIProvider theme={theme}>
        <IconlyProvider
          set='light'
          primaryColor='black'
          secondaryColor='white'
          stroke='bold'
          size='xlarge'
        />
        <App />
      </NextUIProvider>
    </MsalProvider>
  </React.StrictMode>
);

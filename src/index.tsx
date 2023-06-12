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

registerLocale(LOCALE, fr);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
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
  </React.StrictMode>
);

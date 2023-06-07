import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { fr } from 'date-fns/locale';
import { registerLocale } from 'react-datepicker';
import { LOCALE } from './shared/constants/locale.constant';
import { NextUIProvider } from '@nextui-org/react';
import SnackbarProvider from './shared/context/snackbarProvider';

registerLocale(LOCALE, fr);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </React.StrictMode>
);

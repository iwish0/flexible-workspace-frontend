import { LOCALE } from './shared/constants/locale.constant';
import { NextUIProvider } from '@nextui-org/react';
import { registerLocale } from 'react-datepicker';
import ReactDOM from 'react-dom/client';
import { fr } from 'date-fns/locale';
import { theme } from './theme';
import { App } from './App';
import './index.css';
import React from 'react';
registerLocale(LOCALE, fr);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <NextUIProvider theme={theme}>
      <App />
    </NextUIProvider>
  </React.StrictMode>
);

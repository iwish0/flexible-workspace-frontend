import { RouterProvider } from 'react-router-dom';
import { FunctionComponent } from 'react';
import { router } from './router';
import './App.css';

export const App: FunctionComponent = () => <RouterProvider router={router} />



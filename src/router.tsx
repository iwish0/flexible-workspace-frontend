import { DESK_BOOKING } from './shared/constants/route.constant';
import { DeskBooking } from './pages/DeskBooking/DeskBooking';
import { RootLayout } from './layouts/RootLayout/RootLayout';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [{
            path: '',
            element: <DeskBooking />
        }]
    }]
);

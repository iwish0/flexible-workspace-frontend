import { BOOKING_HISTORY, DESK_BOOKING, ROOT, USER } from './shared/constants/route.constant';
import { BookingHistory } from './components/BookingHistory/BookingHistory';
import { DeskBooking } from './pages/DeskBooking/DeskBooking';
import { RootLayout } from './layouts/RootLayout/RootLayout';
import { createBrowserRouter } from 'react-router-dom';
import { User } from './pages/User/User';

export const router = createBrowserRouter([
    {
        path: ROOT,
        element: <RootLayout />,
        children: [{
            path: '',
            element: <DeskBooking />
        }, {
            path: USER,
            element: <User />,
            children: [{
                path: BOOKING_HISTORY,
                element: <BookingHistory />
            }]
        }]
    }]
);

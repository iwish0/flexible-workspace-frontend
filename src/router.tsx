import { BookingHistory } from './components/BookingHistory/BookingHistory';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { Route } from './shared/constants/route.constant';
import { DeskBooking } from './pages/DeskBooking/DeskBooking';
import { RootLayout } from './layouts/RootLayout/RootLayout';
import { User } from './pages/User/User';

export const router = createBrowserRouter([
    {
        path: Route.ROOT,
        element: <Navigate to={Route.DESK_BOOKING} replace />
    },
    {
        path: Route.ROOT,
        element: <RootLayout />,
        children: [{
            path: Route.DESK_BOOKING,
            element: <DeskBooking />
        }, {
            path: Route.USER,
            element: <User />,
            children: [{
                path: Route.BOOKING_HISTORY,
                element: <BookingHistory />
            }]
        }]
    }]
);

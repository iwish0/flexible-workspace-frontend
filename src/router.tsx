import { BookingHistory } from './components/BookingHistory/BookingHistory';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { DeskBooking } from './pages/DeskBooking/DeskBooking';
import { RoomBooking } from './pages/RoomBooking/RoomBooking';
import { RootLayout } from './layouts/RootLayout/RootLayout';
import { Route } from './shared/constants/route.constant';
import { User } from './pages/User/User';

export const router = createBrowserRouter([
    {
        path: Route.ROOT,
        element: <Navigate to={Route.DESK_BOOKING} replace />
    },
    {
        path: Route.ROOT,
        element: <RootLayout />,
        children: [
            {
                path: Route.DESK_BOOKING,
                element: <DeskBooking />
            },
            {
                path: Route.ROOM_BOOKING,
                element: <RoomBooking />
            },
            {
                path: Route.USER,
                element: <User />,
                children: [{
                    path: Route.BOOKING_HISTORY,
                    element: <BookingHistory />
                }]
            }]
    }]
);

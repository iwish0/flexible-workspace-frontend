import { Route } from './route.constant';

export const DESK_BOOKING_KEY: string = Route.DESK_BOOKING;
export const DROPDOWN_MENU_ITEMS: { label: string, key: string, description: string, icon: string }[] = [
    {
        label: 'Place de bureau',
        key: DESK_BOOKING_KEY,
        description: '',
        icon: ''
    },
    {
        label: 'Salle',
        key: Route.ROOM_BOOKING,
        description: 'Salle de réunion, bureau individuel...',
        icon: ''
    }
];

export const collapseItems: { label: string, route: string }[] = [
    { label: 'Réserver un bureau', route: Route.DESK_BOOKING },
    { label: 'Réserver une salle', route: Route.ROOM_BOOKING },
    { label: 'Historique', route: Route.USER_BOOKING_HISTORY },
];
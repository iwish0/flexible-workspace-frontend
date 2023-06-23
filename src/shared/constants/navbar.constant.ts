import { Route } from './route.constant';

export const NAVBAR_ITEMS: { longLabel: string; shortlabel: string, route: string }[] = [
    { shortlabel: 'Bureau', longLabel: 'Réserver un bureau', route: Route.DESK_BOOKING },
    { shortlabel: 'Salle', longLabel: 'Réserver une salle', route: Route.ROOM_BOOKING },
    { shortlabel: 'Historique', longLabel: 'Historique', route: Route.USER_BOOKING_HISTORY },
    { shortlabel: 'Login', longLabel: 'Login', route: '' },
];
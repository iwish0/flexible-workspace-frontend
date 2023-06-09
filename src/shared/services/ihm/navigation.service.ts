import { Route } from '../../constants/route.constant'
import { LocationState } from '../../models/ihm/navigation.model'

export class NavigationService {

    public static getLocationStatus = (pathname: string): LocationState => {
        return {
            isPathNameDeskBooking: pathname === `${Route.ROOT}${Route.DESK_BOOKING}`,
            isPathNameUserBookingHistory: pathname === `${Route.ROOT}${Route.USER_BOOKING_HISTORY}`
        };
    }
}
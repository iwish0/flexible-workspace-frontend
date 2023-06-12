import { RouteStatus } from '../../models/ihm/navigation.model'
import { Route } from '../../constants/route.constant'

export class NavigationService {

    public static getRouteStatus(pathname: string): RouteStatus {
        const selectedRoute: string = NavigationService.pathNameToRoute(pathname);
        return {
            isRouteDeskBooking: selectedRoute === `${Route.DESK_BOOKING}`,
            isRouteUserBookingHistory: selectedRoute === `${Route.USER_BOOKING_HISTORY}`
        };
    }

    /**
     * Remove the firt character '/' of the pathName
     */
    public static pathNameToRoute(pathName: string): string {
        return pathName ? pathName.slice(1) : '';
    }
}
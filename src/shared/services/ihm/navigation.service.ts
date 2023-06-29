export class NavigationService {

    /**
     * Remove the firt character '/' of the pathName
     */
    public static pathNameToRoute(pathName: string): string {
        return pathName ? pathName.slice(1) : '';
    }
}
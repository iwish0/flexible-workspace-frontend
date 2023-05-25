import axios from 'axios';

export type SearchDeskCriteria = {
    checkInDate: Date;
    checkOutDate: Date;
}

export class DeskBookingService {

    public static async searchAvailableDesk(criteria: SearchDeskCriteria) {
        try {
            const result = axios.post(`${process.env.REACT_APP_API_URL}/criteria`, criteria);
            console.log(result);
            return result
            //  (`${process.env.REACT_APP_API_URL}/criteria`,{method:'POST'})
        } catch (e) {
            console.log(e);
        }
    }

}
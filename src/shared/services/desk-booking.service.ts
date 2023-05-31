import axios from 'axios';
import { DeskBookingsUrl } from '../constants/url.constant';

export type SearchDeskCriteria = {
    checkInDateTime: Date;
    checkOutDateTime: Date;
}

export class DeskBookingService {
    public static async getListDeskBookingState(criteria: SearchDeskCriteria) {
        try {
            return await axios.post(`${process.env.REACT_APP_API_URL}${DeskBookingsUrl.STATE}`, criteria);
        } catch (e) {
            console.log(e);
        }
    }
}
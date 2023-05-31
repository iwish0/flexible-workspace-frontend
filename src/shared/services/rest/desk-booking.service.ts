import { DeskBookingState } from '../../models/rest/desk-booking-state';
import { DeskBookingsUrl } from '../../constants/url.constant';
import axios, { AxiosResponse } from 'axios';

export type SearchDeskCriteria = {
    checkInDateTime: Date;
    checkOutDateTime: Date;
}

export class DeskBookingService {
    public static async getListDeskBookingState(criteria: SearchDeskCriteria): Promise<DeskBookingState[]> {
        const result: AxiosResponse<DeskBookingState[]> = await axios.post<DeskBookingState[]>(`${process.env.REACT_APP_API_URL}${DeskBookingsUrl.STATE}`, criteria);
        return result.data;
    }
}
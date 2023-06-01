import { OfficeLayoutSVGData } from '../../models/ihm/rest/office-layout.model';
import { DeskBookingsUrl } from '../../constants/url.constant';
import { DeskBooking } from 'models/desk-booking-state';
import axios, { AxiosResponse } from 'axios';

export type SearchDeskCriteria = {
    checkInDateTime: Date;
    checkOutDateTime: Date;
}

export class DeskBookingService {

    public static async create(deskBooking: DeskBooking): Promise<DeskBooking> {
        const result: AxiosResponse<DeskBooking> = await axios.post<DeskBooking>(`${process.env.REACT_APP_API_URL}${DeskBookingsUrl}`, deskBooking);
        return result.data;
    }

    public static async getOfficeLayoutWithDeskBookingsState(criteria: SearchDeskCriteria): Promise<OfficeLayoutSVGData[]> {
        const result: AxiosResponse<OfficeLayoutSVGData[]> = await axios.post<OfficeLayoutSVGData[]>(`${process.env.REACT_APP_API_URL}${DeskBookingsUrl.STATE_OFFICE_LAYOUT}`, criteria);
        return result.data;
    }
}


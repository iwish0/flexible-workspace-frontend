import { OfficeLayoutSVGData } from '../../models/rest/office-layout.model';
import { DeskBooking } from '../../models/rest/desk-booking.model';
import { DeskBookingsUrl } from '../../constants/url.constant';
import axios, { AxiosResponse } from 'axios';

export type SearchDeskCriteria = {
    checkInDateTime: Date;
    checkOutDateTime: Date;
}

export class DeskBookingService {

    public static async create(deskBooking: DeskBooking): Promise<DeskBooking> {
        const result: AxiosResponse<DeskBooking> = await axios.post<DeskBooking>(DeskBookingsUrl.BASE_URL, deskBooking);
        return result.data;
    }

    public static async getOfficeLayoutWithDeskBookingsState(criteria: SearchDeskCriteria): Promise<OfficeLayoutSVGData[]> {
        const result: AxiosResponse<OfficeLayoutSVGData[]> = await axios.post<OfficeLayoutSVGData[]>(DeskBookingsUrl.STATE_OFFICE_LAYOUT, criteria);
        return result.data;
    }
}


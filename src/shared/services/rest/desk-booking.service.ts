import { DeskOfficeLayoutSVGData } from '../../models/rest/office-layout.model';
import { DeskBooking, DeskBookingInfo } from '../../models/rest/desk-booking.model';
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

    public static async getOfficeLayoutWithDeskBookingsState(criteria: SearchDeskCriteria): Promise<DeskOfficeLayoutSVGData[]> {
        const result: AxiosResponse<DeskOfficeLayoutSVGData[]> = await axios.post<DeskOfficeLayoutSVGData[]>(DeskBookingsUrl.STATE_OFFICE_LAYOUT, criteria);
        return result.data;
    }

    public static async getDeskBookingHistoryByUserId(userId: string): Promise<DeskBookingInfo[]> {
        const result: AxiosResponse<DeskBookingInfo[]> = await axios.get<DeskBookingInfo[]>(`${DeskBookingsUrl.BASE_URL}/${userId}`);
        return result.data;
    }

    public static async delete(bookingId: string): Promise<DeskBookingInfo[]> {
        const result: AxiosResponse<DeskBookingInfo[]> = await axios.delete<DeskBookingInfo[]>(`${DeskBookingsUrl.BASE_URL}/${bookingId}`);
        return result.data;
    }
}


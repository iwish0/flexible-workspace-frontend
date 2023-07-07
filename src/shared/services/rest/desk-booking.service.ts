import { DeskOfficeLayoutSVGData } from '../../models/rest/office-layout.model';
import { DeskBooking, DeskBookingInfo } from '../../models/rest/desk-booking.model';
import { DeskBookingsUrl } from '../../constants/url.constant';
import { axiosInstance } from './axios.config';
import { AxiosResponse } from 'axios';

export type SearchDeskCriteria = {
    checkInDateTime: Date;
    checkOutDateTime: Date;
}

export class DeskBookingService {

    public static async create(deskBooking: DeskBooking, token: string): Promise<DeskBooking> {
        const result: AxiosResponse<DeskBooking> = await axiosInstance(token).post<DeskBooking>(DeskBookingsUrl.BASE_URL, deskBooking);
        return result.data;
    }

    public static async getOfficeLayoutWithDeskBookingsState(criteria: SearchDeskCriteria, token: string): Promise<DeskOfficeLayoutSVGData[]> {
        const result: AxiosResponse<DeskOfficeLayoutSVGData[]> = await axiosInstance(token).post<DeskOfficeLayoutSVGData[]>(DeskBookingsUrl.STATE_OFFICE_LAYOUT, criteria);
        return result.data;
    }

    public static async getDeskBookingHistoryByUserId(userId: string, token: string): Promise<DeskBookingInfo[]> {
        const result: AxiosResponse<DeskBookingInfo[]> = await axiosInstance(token).get<DeskBookingInfo[]>(`${DeskBookingsUrl.BASE_URL}/${userId}`);
        return result.data;
    }

    public static async delete(bookingId: string, token: string): Promise<DeskBookingInfo[]> {
        const result: AxiosResponse<DeskBookingInfo[]> = await axiosInstance(token).delete<DeskBookingInfo[]>(`${DeskBookingsUrl.BASE_URL}/${bookingId}`);
        return result.data;
    }
}


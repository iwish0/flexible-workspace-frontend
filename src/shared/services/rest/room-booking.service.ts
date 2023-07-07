import { RoomBooking, RoomBookingInfo } from '../../models/rest/room-booking.model';
import { RoomOfficeLayoutSVGData } from '../../models/rest/office-layout.model';
import { RoomBookingsUrl } from '../../constants/url.constant';
import { axiosInstance } from './axios.config';
import { AxiosResponse } from 'axios';

export type SearchRoomCriteria = {
    checkInDateTime: Date;
    checkOutDateTime: Date;
}

export class RoomBookingService {

    public static async create(roomBooking: RoomBooking, token: string): Promise<RoomBooking> {
        const result: AxiosResponse<RoomBooking> = await axiosInstance(token).post<RoomBooking>(RoomBookingsUrl.BASE_URL, roomBooking);
        return result.data;
    }

    public static async getOfficeLayoutWithRoomBookingsState(criteria: SearchRoomCriteria, token: string): Promise<RoomOfficeLayoutSVGData[]> {
        const result: AxiosResponse<RoomOfficeLayoutSVGData[]> = await axiosInstance(token).post<RoomOfficeLayoutSVGData[]>(RoomBookingsUrl.STATE_OFFICE_LAYOUT, criteria);
        return result.data;
    }

    public static async getRoomBookingHistoryByUserId(userId: string, token: string): Promise<RoomBookingInfo[]> {
        const result: AxiosResponse<RoomBookingInfo[]> = await axiosInstance(token).get<RoomBookingInfo[]>(`${RoomBookingsUrl.BASE_URL}/${userId}`);
        return result.data;
    }

    public static async delete(bookingId: string, token: string): Promise<RoomBookingInfo[]> {
        const result: AxiosResponse<RoomBookingInfo[]> = await axiosInstance(token).delete<RoomBookingInfo[]>(`${RoomBookingsUrl.BASE_URL}/${bookingId}`);
        return result.data;
    }
}

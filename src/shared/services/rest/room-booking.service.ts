import { RoomBooking, RoomBookingInfo } from '../../models/rest/room-booking.model';
import { RoomOfficeLayoutSVGData } from '../../models/rest/office-layout.model';
import { RoomBookingsUrl } from '../../constants/url.constant';
import axios, { AxiosResponse } from 'axios';

export type SearchRoomCriteria = {
    checkInDateTime: Date;
    checkOutDateTime: Date;
}

export class RoomBookingService {

    public static async create(roomBooking: RoomBooking): Promise<RoomBooking> {
        const result: AxiosResponse<RoomBooking> = await axios.post<RoomBooking>(RoomBookingsUrl.BASE_URL, roomBooking);
        return result.data;
    }

    public static async getOfficeLayoutWithRoomBookingsState(criteria: SearchRoomCriteria): Promise<RoomOfficeLayoutSVGData[]> {
        const result: AxiosResponse<RoomOfficeLayoutSVGData[]> = await axios.post<RoomOfficeLayoutSVGData[]>(RoomBookingsUrl.STATE_OFFICE_LAYOUT, criteria);
        return result.data;
    }

    public static async getRoomBookingHistoryByUserId(userId: number): Promise<RoomBookingInfo[]> {
        const result: AxiosResponse<RoomBookingInfo[]> = await axios.get<RoomBookingInfo[]>(`${RoomBookingsUrl.BASE_URL}/${userId}`);
        return result.data;
    }

    public static async delete(bookingId: string): Promise<RoomBookingInfo[]> {
        const result: AxiosResponse<RoomBookingInfo[]> = await axios.delete<RoomBookingInfo[]>(`${RoomBookingsUrl.BASE_URL}/${bookingId}`);
        return result.data;
    }
}

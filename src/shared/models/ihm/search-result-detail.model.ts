import { DeskBookingState } from "../rest/desk-booking.model";
import { RoomBookingState } from "../rest/room-booking.model";
import { User } from "../rest/user.model";

export type SearchResultDetail = {
    user: User | null;
    placeName: string;
    location: string;
    isBooked: boolean;
    checkInDate: string | null;
    checkoutDate: string | null;
    checkInTime: string | null;
    checkOutTime: string | null;
    maxCapacity: number | null;
    description: string | null;
    bookingState: DeskBookingState | RoomBookingState
}
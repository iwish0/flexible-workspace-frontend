import { Desk } from './desk.model';
import { User } from './user.model';

export type DeskBooking = {
    user: User;
    deskId: string;
    checkInDateTime: string;
    checkOutDateTime: string;
    comment?: string;
    dateCreated?: string;
}

export type DeskBookingState = {
    searchCriteria: SearchCriteria;
    deskInfo: Desk;
    bookingInfo: DeskBooking;
    isBooked: boolean;
}

export type SearchCriteria = {
    checkInDateTime: string;
    checkOutDateTime: string;
};
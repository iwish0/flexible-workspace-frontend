import { Desk } from './desk.model';
import { User } from './user.model';

export type DeskBooking = {
    user: User;
    deskId: string;
    checkInDateTime: string;
    checkOutDateTime: string;
    comment?: string;
    dateCreated?: string;
    _id?: string;
}

export type DeskBookingState = {
    searchCriteria: SearchCriteria;
    isBooked: boolean;
} & DeskBookingInfo;

export type SearchCriteria = {
    checkInDateTime: string;
    checkOutDateTime: string;
};

export type DeskBookingInfo = {
    deskInfo: Desk;
    bookingInfo: DeskBooking;
};
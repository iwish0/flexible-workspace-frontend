import { Desk } from 'models/desk-booking-state';
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
    deskInfo: Desk;
    bookingInfo: DeskBooking;
    isBooked: boolean;
}
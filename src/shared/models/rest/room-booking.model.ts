import { Room } from './room.model';
import { User } from './user.model';

export type RoomBooking = {
    user: User;
    roomId: string;
    checkInDateTime: string;
    checkOutDateTime: string;
    comment?: string;
    dateCreated?: string;
    _id?: string;
}

export type RoomBookingState = {
    searchCriteria: SearchCriteria;
    isBooked: boolean;
} & RoomBookingInfo;

export type SearchCriteria = {
    checkInDateTime: string;
    checkOutDateTime: string;
};

export type RoomBookingInfo = {
    roomInfo: Room;
    bookingInfo: RoomBooking;
};
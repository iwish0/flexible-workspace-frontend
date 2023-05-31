export type DeskBookingState = {
    deskInfo: Desk;
    bookingInfo: DeskBooking;
    isBooked: boolean;
}

export type DeskBooking = {
    userName: string;
    deskId: string;
    dateCreated: string;
    checkInDateTime: string;
    checkOutDateTime: string;
    comment: string;
}

export type Desk = {
    _id: string;
    name: string;
    location: string;
}
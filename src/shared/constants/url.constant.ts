/* eslint-disable @typescript-eslint/no-namespace */
const API_URL: string = process.env.REACT_APP_API_URL || '';

export namespace DeskBookingsUrl {
  export const BASE_URL: string = `${API_URL}/desk-bookings`;
  export const STATE_OFFICE_LAYOUT: string = `${DeskBookingsUrl.BASE_URL}/state/office-layout`;
}

export namespace RoomBookingsUrl {
  export const BASE_URL: string = `${API_URL}/room-bookings`;
  export const STATE_OFFICE_LAYOUT: string = `${RoomBookingsUrl.BASE_URL}/state/office-layout`;
}

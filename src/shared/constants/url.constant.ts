/* eslint-disable @typescript-eslint/no-namespace */
const API_URL: string = process.env.REACT_APP_API_URL || '';

export namespace DeskBookingsUrl {
  export const BASE_URL = `${API_URL}/desk-bookings`;
  export const STATE_OFFICE_LAYOUT = `${DeskBookingsUrl.BASE_URL}/state/office-layout`;
}

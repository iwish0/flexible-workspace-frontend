import { DeskBookingHistory } from './DeskBookingHistory/DeskBookingHistory';
import { RoomBookingHistory } from './RoomBookingHistory/RoomBookingHistory';
import { FunctionComponent } from 'react';
import './BookingHistory.css';

export const BookingHistory: FunctionComponent = () => {
  return (
    <>
      <DeskBookingHistory />
      <RoomBookingHistory />
    </>
  );
}
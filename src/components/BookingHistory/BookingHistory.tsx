import { DeskBookingHistory } from './DeskBookingHistory/DeskBookingHistory';
import { RoomBookingHistory } from './RoomBookingHistory/RoomBookingHistory';
import { useOutletContext } from 'react-router-dom';
import { FunctionComponent } from 'react';
import './BookingHistory.css';

export const BookingHistory: FunctionComponent = () => {
  const { userId } = useOutletContext<{ userId: number }>();

  return (
    <>
      <DeskBookingHistory userId={userId} />
      <RoomBookingHistory userId={userId} />
    </>
  );
}
import { DeskBookingHistory } from './DeskBookingHistory/DeskBookingHistory';
import { RoomBookingHistory } from './RoomBookingHistory/RoomBookingHistory';
import { useMsal } from '@azure/msal-react';
import { FunctionComponent } from 'react';
import './BookingHistory.css';

export const BookingHistory: FunctionComponent = () => {
  const { localAccountId } = useMsal().accounts[0];

  return (
    <>
      <DeskBookingHistory userId={localAccountId} />
      <RoomBookingHistory userId={localAccountId} />
    </>
  );
}
import { RoomBookingForm } from '../../components/RoomBookingForm/RoomBookingForm';
import { FunctionComponent } from 'react';
import './RoomBooking.css';

export const RoomBooking: FunctionComponent = () => {
  return (
    <div className='content'>
      <RoomBookingForm />
    </div>
  );
};

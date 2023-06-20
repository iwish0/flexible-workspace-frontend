import { DeskBookingForm } from '../../components/DeskBookingForm/DeskBookingForm';
import { FunctionComponent } from 'react';
import './DeskBooking.css';

export const DeskBooking: FunctionComponent = () => {
  return (
    <div className='content'>
      <DeskBookingForm />
    </div>
  );
};

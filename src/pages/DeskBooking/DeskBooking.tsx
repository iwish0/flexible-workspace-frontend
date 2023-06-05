import { FunctionComponent } from 'react';
import { DeskBookingForm } from '../../components/DeskBookingForm/DeskBookingForm';
import './DeskBooking.css';

export const DeskBooking: FunctionComponent = () => {
  return (
    <div className='content'>
      <DeskBookingForm />
    </div>
  );
};

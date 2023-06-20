import { RoomBookingService } from '../../../shared/services/rest/room-booking.service';
import { ErrorHandlerService } from '../../../shared/services/ihm/error-handler.service';
import { RoomBookingInfo } from '../../../shared/models/rest/room-booking.model';
import { DELETE_BOOKING_MODAL } from '../../../shared/constants/modal.constant';
import { CANCEL, CONFIRM } from '../../../shared/constants/label.constant';
import { ConfirmModal } from '../../UI/ConfirmModal/ConfirmModal';
import { DateHelper } from '../../../shared/helpers/date.helper';
import { FunctionComponent, useEffect, useState } from 'react';
import { BookingCard } from '../../bookingCard/BookingCard';
import { Grid, Loading } from '@nextui-org/react';
import './RoomBookingHistory.css';

type Props = {
  userId: number;
}

export const RoomBookingHistory: FunctionComponent<Props> = ({ userId }) => {
  const [bookings, setBookings] = useState<RoomBookingInfo[]>([]);
  const [bookingId, setBookingId] = useState<string>('');
  const [deleteBookingConfirmModalVisible, setDeleteBookingConfirmModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getBookingHistory().finally(() => setLoading(false));
  }, [userId]);

  const getBookingHistory = (): Promise<void> => {
    return RoomBookingService.getRoomBookingHistoryByUserId(userId)
      .then((bookings: RoomBookingInfo[]) => setBookings(bookings))
      .catch(ErrorHandlerService.handleError);
  }

  const closeDeleteBookingModal = (): void => {
    setDeleteBookingConfirmModalVisible(false)
  }

  const openDeleteBookingModal = (bookingId: string): void => {
    setBookingId(bookingId);
    setDeleteBookingConfirmModalVisible(true);
  }

  const onConfirmDeleteBooking = (): void => {
    setDeleteBookingConfirmModalVisible(false);
    setLoading(true);
    if (bookingId) {
      RoomBookingService.delete(bookingId)
        .then(() => {
          getBookingHistory();
        })
        .catch(ErrorHandlerService.handleError)
        .finally(() => {
          setLoading(false);
        });
    }
  }

  return (
    <>
      <h2>Réservation salle</h2>
      {loading ? (<Loading className='container' color={'secondary'} size='xl' />) : (
        <div>
          <Grid.Container gap={2}>
            {bookings.map(({ bookingInfo, roomInfo }) => (
              <Grid className='grid' key={bookingInfo._id} xs={12} sm={6} md={4} xl={3}>
                <BookingCard
                  id={bookingInfo._id || ''}
                  bookingDateCreated={bookingInfo.dateCreated || ''}
                  checkInDate={bookingInfo.checkInDateTime}
                  checkOutDate={bookingInfo.checkOutDateTime}
                  comment={bookingInfo.comment}
                  placeName={roomInfo.name}
                  onCancel={openDeleteBookingModal}
                />
              </Grid>
            ))}
          </Grid.Container>
          <ConfirmModal
            title={DELETE_BOOKING_MODAL.title}
            bodyContent={DELETE_BOOKING_MODAL.bodyContent}
            btnCancelLabel={CANCEL}
            btnConfirmLabel={CONFIRM}
            onCancel={closeDeleteBookingModal}
            onConfirm={onConfirmDeleteBooking}
            visible={deleteBookingConfirmModalVisible}
          />
        </div>)}
    </>
  );
}
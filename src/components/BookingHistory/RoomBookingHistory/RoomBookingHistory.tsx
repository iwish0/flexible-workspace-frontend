import { RoomBookingService } from '../../../shared/services/rest/room-booking.service';
import { ErrorHandlerService } from '../../../shared/services/ihm/error-handler.service';
import { RoomBookingInfo } from '../../../shared/models/rest/room-booking.model';
import { DELETE_BOOKING_MODAL } from '../../../shared/constants/modal.constant';
import { BookingHistoryCard } from '../BookingHistoryCard/BookingHistoryCard';
import { CANCEL, CONFIRM } from '../../../shared/constants/label.constant';
import { Card, Grid, Loading, Row, Text } from '@nextui-org/react';
import { ConfirmModal } from '../../UI/ConfirmModal/ConfirmModal';
import { DateHelper } from '../../../shared/helpers/date.helper';
import { FunctionComponent, useEffect, useState } from 'react';
import { defaultLoginRequest } from '../../../authConfig';
import { useMsal } from '@azure/msal-react';
import { Calendar } from 'react-iconly';
import './RoomBookingHistory.css';

export const RoomBookingHistory: FunctionComponent = () => {
  const { instance, accounts } = useMsal();
  const [bookings, setBookings] = useState<RoomBookingInfo[]>([]);
  const [bookingId, setBookingId] = useState<string>('');
  const [deleteBookingConfirmModalVisible, setDeleteBookingConfirmModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => { getBookingHistory().finally(() => setLoading(false)) }, []);

  const getBookingHistory = async (): Promise<void> => {
    try {
      const token: string = (await instance.acquireTokenSilent({ ...defaultLoginRequest, account: accounts[0] }))?.accessToken;
      const bookings: RoomBookingInfo[] = await RoomBookingService.getRoomBookingHistoryByUserId(accounts[0].localAccountId, token);
      setBookings(bookings);
    } catch (e: any) {
      ErrorHandlerService.handleError(e);
    }
  }

  const closeDeleteBookingModal = (): void => {
    setDeleteBookingConfirmModalVisible(false)
  }

  const openDeleteBookingModal = (bookingId: string): void => {
    setBookingId(bookingId);
    setDeleteBookingConfirmModalVisible(true);
  }

  const onConfirmDeleteBooking = async (): Promise<void> => {
    try {
      setDeleteBookingConfirmModalVisible(false);
      setLoading(true);
      if (bookingId) {
        const token: string = (await instance.acquireTokenSilent({ ...defaultLoginRequest, account: accounts[0] }))?.accessToken;
        await RoomBookingService.delete(bookingId, token);
        await getBookingHistory();
      }
    } catch (e: any) {
      ErrorHandlerService.handleError(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Card css={{ mb: 25, color: '$secondary' }}>
        <Card.Body>
          <Row justify='center' align='center'>
            <Calendar set='light' size={'large'} />
            <Text b css={{ fontSize: 20, color: '$secondary', marginLeft: 15 }}>Réservation salle</Text>
          </Row>
        </Card.Body>
      </Card>
      {loading ? (<Loading className='container' color={'secondary'} size='xl' />) : (
        <div>
          <Grid.Container gap={2}>
            {bookings.map(({ bookingInfo, roomInfo }) => (
              <Grid className='grid' key={bookingInfo._id} xs={12} sm={6} md={4} xl={3}>
                <BookingHistoryCard
                  id={bookingInfo._id || ''}
                  bookingDateCreated={bookingInfo.dateCreated || ''}
                  checkInDate={bookingInfo.checkInDateTime}
                  checkOutDate={bookingInfo.checkOutDateTime}
                  checkInTime={DateHelper.getHourAndMinutFromDate(new Date(bookingInfo.checkInDateTime))}
                  checkoutTime={DateHelper.getHourAndMinutFromDate(new Date(bookingInfo.checkOutDateTime))}
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
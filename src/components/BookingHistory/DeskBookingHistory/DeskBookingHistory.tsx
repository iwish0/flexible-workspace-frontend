import { DeskBookingService } from '../../../shared/services/rest/desk-booking.service';
import { ErrorHandlerService } from '../../../shared/services/ihm/error-handler.service';
import { DeskBookingInfo } from '../../../shared/models/rest/desk-booking.model';
import { DELETE_BOOKING_MODAL } from '../../../shared/constants/modal.constant';
import { BookingHistoryCard } from '../BookingHistoryCard/BookingHistoryCard';
import { CANCEL, CONFIRM } from '../../../shared/constants/label.constant';
import { Card, Grid, Loading, Row, Text } from '@nextui-org/react';
import { ConfirmModal } from '../../UI/ConfirmModal/ConfirmModal';
import { FunctionComponent, useEffect, useState } from 'react';
import { defaultLoginRequest } from '../../../authConfig';
import { useMsal } from '@azure/msal-react';
import { Calendar } from 'react-iconly';
import './DeskBookingHistory.css';

export const DeskBookingHistory: FunctionComponent = () => {
  const { instance, accounts } = useMsal();
  const [bookings, setBookings] = useState<DeskBookingInfo[]>([]);
  const [bookingId, setBookingId] = useState<string>('');
  const [deleteBookingConfirmModalVisible, setDeleteBookingConfirmModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => { getBookingHistory().finally(() => setLoading(false)) }, []);

  const getBookingHistory = async (): Promise<void> => {
    try {
      const token: string = (await instance.acquireTokenSilent({ ...defaultLoginRequest, account: accounts[0] }))?.accessToken;
      const bookings: DeskBookingInfo[] = await DeskBookingService.getDeskBookingHistoryByUserId(accounts[0].localAccountId, token)
      setBookings(bookings);
    } catch (e: any) {
      ErrorHandlerService.handleError(e)
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
        await DeskBookingService.delete(bookingId, token);
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
            <Text b css={{ fontSize: 20, color: '$secondary', marginLeft: 15 }}>Réservation bureau</Text>
          </Row>
        </Card.Body>
      </Card>
      {loading ? (<Loading className='container' color={'secondary'} size='xl' />) : (
        <div>
          <Grid.Container gap={3} css={{ mb: 40 }}>
            {bookings.map(({ bookingInfo, deskInfo }) => (
              <Grid key={bookingInfo._id} xs={12} sm={6} md={4} xl={3} >
                <BookingHistoryCard
                  id={bookingInfo._id || ''}
                  bookingDateCreated={bookingInfo.dateCreated || ''}
                  checkInDate={bookingInfo.checkInDateTime}
                  checkOutDate={bookingInfo.checkOutDateTime}
                  comment={bookingInfo.comment}
                  placeName={deskInfo.name}
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
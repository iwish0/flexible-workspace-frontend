import { ErrorHandlerService } from '../../../shared/services/ihm/error-handler.service';
import { DeskBookingService } from '../../../shared/services/rest/desk-booking.service';
import { ErrorInformation, ErrorType } from '../../../shared/models/ihm/error.model';
import { DeskBookingInfo } from '../../../shared/models/rest/desk-booking.model';
import { DELETE_BOOKING_MODAL } from '../../../shared/constants/modal.constant';
import { BookingHistoryCard } from '../BookingHistoryCard/BookingHistoryCard';
import { CANCEL, CONFIRM } from '../../../shared/constants/label.constant';
import { ErrorNotifyModal } from '../../UI/ErrorNotifyModal/ErrorNotifyModal';
import { Card, Grid, Loading, Row, Text } from '@nextui-org/react';
import { ConfirmModal } from '../../UI/ConfirmModal/ConfirmModal';
import { FunctionComponent, useEffect, useState } from 'react';
import { defaultLoginRequest } from '../../../authConfig';
import { useMsal } from '@azure/msal-react';
import { Calendar } from 'react-iconly';
import './DeskBookingHistory.css';

export const DeskBookingHistory: FunctionComponent = () => {
  const { instance, accounts } = useMsal();
  const [error, setError] = useState<ErrorInformation | null>(null);
  const [bookings, setBookings] = useState<DeskBookingInfo[]>([]);
  const [bookingId, setBookingId] = useState<string>('');
  const [deleteBookingConfirmModalVisible, setDeleteBookingConfirmModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => { getBookingHistory(); }, []);

  const getBookingHistory = async (): Promise<void> => {
    try {
      const token: string = (await instance.acquireTokenSilent({ ...defaultLoginRequest, account: accounts[0] }))?.accessToken;
      const bookings: DeskBookingInfo[] = await DeskBookingService.getDeskBookingHistoryByUserId(accounts[0].localAccountId, token)
      setBookings(bookings);
    } catch (error: unknown) {
      setError(ErrorHandlerService.getErrorInformation(error as ErrorType));
    } finally {
      setLoading(false)
    }
  }

  const closeDeleteBookingModal = (): void => {
    setDeleteBookingConfirmModalVisible(false)
  }

  const CloseErrorNotifyModal = (): void => {
    setError(null);
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
    } catch (error: unknown) {
      setError(ErrorHandlerService.getErrorInformation(error as ErrorType));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ErrorNotifyModal error={error} onClose={CloseErrorNotifyModal} visible={!!error} />
      <Card css={{ mb: 25, color: '$secondary' }}>
        <Card.Body>
          <Row justify='center' align='center'>
            <Calendar set='light' size={'large'} />
            <Text b css={{ fontSize: 20, color: '$secondary', marginLeft: 15 }}>Réservation bureau</Text>
          </Row>
        </Card.Body>
      </Card>
      {loading ? (<Loading className='container loader' color={'secondary'} size='xl' />) : (
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
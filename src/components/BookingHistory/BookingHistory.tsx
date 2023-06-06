import { DeskBooking, DeskBookingInfo } from '../../shared/models/rest/desk-booking.model';
import { DeskBookingService } from '../../shared/services/rest/desk-booking.service';
import { ErrorHandlerService } from '../../shared/services/ihm/error-handler.service';
import { Button, Card, Divider, Grid, Loading, Row, Text } from '@nextui-org/react';
import { DELETE_BOOKING_MODAL } from '../../shared/constants/modal.constant';
import { CANCEL, CONFIRM } from '../../shared/constants/label.constant';
import { FunctionComponent, useEffect, useState } from 'react';
import { ConfirmModal } from '../UI/ConfirmModal/ConfirmModal';
import { DateHelper } from '../../shared/helpers/date.helper';
import { useOutletContext } from 'react-router-dom';
import './BookingHistory.css';

export const BookingHistory: FunctionComponent = () => {
  const { userId } = useOutletContext<{ userId: number }>();
  const [bookings, setBookings] = useState<DeskBookingInfo[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<DeskBooking>();
  const [deleteBookingConfirmModalVisible, setDeleteBookingConfirmModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getBookingHistory().finally(() => setLoading(false));
  }, [userId]);

  const getBookingHistory = (): Promise<void> => {
    return DeskBookingService.getDeskBookingHistoryByUserId(userId)
      .then((bookings: DeskBookingInfo[]) => setBookings(bookings))
      .catch(ErrorHandlerService.handleError);
  }

  const closeDeleteBookingModal = (): void => {
    setDeleteBookingConfirmModalVisible(false)
  }

  const openDeleteBookingModal = (deskBooking: DeskBooking): void => {
    setSelectedBooking(deskBooking);
    setDeleteBookingConfirmModalVisible(true);
  }

  const onConfirmDeleteBooking = (): void => {
    setDeleteBookingConfirmModalVisible(false);
    setLoading(true);
    if (selectedBooking && selectedBooking._id) {
      DeskBookingService.delete(selectedBooking._id)
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
      {loading ? (<Loading className='container' color={'secondary'} size='xl' />) : (
        <div>
          <Grid.Container gap={2}>
            {bookings.map(({ bookingInfo, deskInfo }) => (
              <Grid className='grid' key={bookingInfo._id} xs={12} sm={6} md={4} xl={3}>
                <Card css={{ mw: '330px' }}>
                  <Card.Header>
                    <Text b>Réservé le {DateHelper.formatDate(bookingInfo.dateCreated || '')} </Text>
                  </Card.Header>
                  <Card.Divider />
                  <Card.Body css={{ py: '$10' }}>
                    <div className='flex-row'>
                      <span>Date de début :</span>
                      <span>{DateHelper.formatDate(bookingInfo.checkInDateTime)}</span>
                    </div>
                    <div className='flex-row'>
                      <span>Date de fin :</span>
                      <span>{DateHelper.formatDate(bookingInfo.checkOutDateTime)}</span>
                    </div>
                    <div className='flex-row'>
                      <span>Emplacement:</span>
                      <span>{deskInfo.name}</span>
                    </div>
                    <Divider css={{ mb: 10, mt: 10 }} />
                    <div className='comment'>
                      <span>Commentaire:</span>
                      <span>{bookingInfo.comment}</span>
                    </div>
                  </Card.Body>
                  <Card.Divider />
                  <Card.Footer>
                    <Row justify='flex-end'>
                      {/* <Button size='sm' light>
                  Modifier
                </Button> */}
                      <Button
                        onClick={() => openDeleteBookingModal(bookingInfo)}
                        size='sm'
                        color='secondary'>
                        Supprimer
                      </Button>
                    </Row>
                  </Card.Footer>
                </Card>
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
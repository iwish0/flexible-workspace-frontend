import { BookingConfirmModal, BookingConfirmationModalData } from '../BookingConfirmModal/BookingConfirmModal';
import { RoomBookingService, SearchRoomCriteria } from '../../shared/services/rest/room-booking.service';
import { SearchResultDetailService } from '../../shared/services/ihm/search-result-detail.service';
import { RoomBooking, RoomBookingState } from '../../shared/models/rest/room-booking.model';
import { RoomOfficeLayoutSVGData } from '../../shared/models/rest/office-layout.model';
import { ErrorHandlerService } from '../../shared/services/ihm/error-handler.service';
import { BookingFormResult } from '../BookingFormResult/BookingFormResult';
import { DD_MM_YYYY } from '../../shared/constants/date.constant';
import { LOCALE } from '../../shared/constants/locale.constant';
import { FunctionComponent, useEffect, useState } from 'react';
import { HEURE } from '../../shared/constants/label.constant';
import { DateHelper } from '../../shared/helpers/date.helper';
import { OfficeLayout } from '../OfficeLayout2/OfficeLayout';
import { Button, Divider, Loading } from '@nextui-org/react';
import { Field } from '../../shared/models/ihm/form.model';
import { defaultLoginRequest } from '../../authConfig';
import 'react-datepicker/dist/react-datepicker.css';
import { useMsal } from '@azure/msal-react';
import DatePicker from 'react-datepicker';
import './RoomBookingForm.css';

type Form = {
  checkInDateTime: Field<Date>;
  checkOutDateTime: Field<Date>;
};

export const RoomBookingForm: FunctionComponent = () => {
  const { instance, accounts } = useMsal();
  const [form, setForm] = useState<Form>({
    checkInDateTime: { value: new Date(), isValid: true },
    checkOutDateTime: { value: new Date(), isValid: true }
  });

  const [listOfficeLayoutSVGData, setListOfficeLayoutSVGData] = useState<RoomOfficeLayoutSVGData[]>([]);
  const [isBookingConfirmModalVisible, setIsBookingConfirmModalVisible] = useState<boolean>(false);
  const [bookingConfirmationModalData, setBookingConfirmationModalData] = useState<BookingConfirmationModalData>(
    {
      checkInDate: '',
      checkOutDate: '',
      checkInTime: '',
      checkOutTime: '',
      placeName: ''

    });
  const [selectedRoom, setSelectedRoom] = useState<RoomBookingState | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (selectedRoom) {
      setBookingConfirmationModalData({
        checkInDate: DateHelper.formatDate(selectedRoom.searchCriteria.checkInDateTime),
        checkOutDate: DateHelper.formatDate(selectedRoom.searchCriteria.checkOutDateTime),
        checkInTime: DateHelper.getHourAndMinutFromDate(new Date(selectedRoom.searchCriteria.checkInDateTime)),
        checkOutTime: DateHelper.getHourAndMinutFromDate(new Date(selectedRoom.searchCriteria.checkOutDateTime)),
        placeName: selectedRoom.roomInfo.name
      });
      setIsBookingConfirmModalVisible(true);
    }
  }, [selectedRoom]);

  const onSelectRoom = (roomBookingState: RoomBookingState): void => {
    setSelectedRoom(() => { return { ...roomBookingState } });
  };

  const closeBookingConfirmModal = (): void => {
    setIsBookingConfirmModalVisible(false);
  };

  const onConfirmBooking = async (comment: string) => {
    setLoading(true);
    setIsBookingConfirmModalVisible(false);
    if (selectedRoom) {
      const roomBooking: RoomBooking = {
        user: {
          email: accounts[0].username,
          id: accounts[0].localAccountId,
          name: accounts[0].name || ''
        },
        comment,
        checkInDateTime: selectedRoom.searchCriteria.checkInDateTime,
        checkOutDateTime: selectedRoom.searchCriteria.checkOutDateTime,
        roomId: selectedRoom.roomInfo._id
      };
      try {
        const token: string = (await instance.acquireTokenSilent({ ...defaultLoginRequest, account: accounts[0] }))?.accessToken;
        await RoomBookingService.create(roomBooking, token);
        getOfficeLayoutWithDeskBookingsState();
      } catch (error: any) {
        ErrorHandlerService.handleError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const onChangeCheckInDate = (date: Date): void => {
    setForm((form) => {
      return { ...form, checkInDateTime: { value: date, isValid: true } };
    });
  };

  const onChangeCheckOutDate = (date: Date): void => {
    setForm((form) => {
      return { ...form, checkOutDateTime: { value: date, isValid: true } };
    });
  };

  function handleSubmit(e: any): void {
    e.preventDefault();
    getOfficeLayoutWithDeskBookingsState();
  }

  const getOfficeLayoutWithDeskBookingsState = async (): Promise<void> => {
    setLoading(true);
    try {
      const criteria: SearchRoomCriteria = {
        checkInDateTime: form.checkInDateTime.value,
        checkOutDateTime: form.checkOutDateTime.value
      }
      const token: string = (await instance.acquireTokenSilent({ ...defaultLoginRequest, account: accounts[0] }))?.accessToken;
      const result: RoomOfficeLayoutSVGData[] = await RoomBookingService.getOfficeLayoutWithRoomBookingsState(criteria, token);
      setListOfficeLayoutSVGData(result);
    } catch (e: any) {
      ErrorHandlerService.handleError(e);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading className='loader' color={'secondary'} size='xl' />
      ) : (
        <div>
          <div className='blockBookingForm'>
            <h2>Rechercher une salle disponible</h2>
            <Divider />
            <form className='form' onSubmit={handleSubmit}>
              <div className='form-group'>
                <label>Date de début</label>
                <DatePicker
                  className='datepicker'
                  selected={form.checkInDateTime.value}
                  onChange={onChangeCheckInDate}
                  locale={LOCALE}
                  dateFormat={DD_MM_YYYY}
                  timeCaption={HEURE}
                  showTimeSelect
                  timeIntervals={15}
                />
              </div>
              <div className='form-group'>
                <label>Date de fin</label>
                <DatePicker
                  className='datepicker'
                  selected={form.checkOutDateTime.value}
                  onChange={onChangeCheckOutDate}
                  locale={LOCALE}
                  dateFormat={DD_MM_YYYY}
                  timeCaption={HEURE}
                  showTimeSelect
                  timeIntervals={15}
                />
              </div>
              <div className='form-group'>
                <Button type='submit' color={'primary'}>
                  Rechercher
                </Button>
              </div>
            </form>
          </div>
          <BookingFormResult data={SearchResultDetailService.formatRoomsDataToSearchResultData(listOfficeLayoutSVGData)} onSelectItem={onSelectRoom} />
          {/* <OfficeLayout
            listOfficeLayoutSVGData={listOfficeLayoutSVGData}
            onSelectElement={onSelectRoom}
          /> */}
          <BookingConfirmModal
            visible={isBookingConfirmModalVisible}
            onCancel={closeBookingConfirmModal}
            onConfirm={onConfirmBooking}
            bookingConfirmationModalData={bookingConfirmationModalData}
          />
        </div>
      )}
    </div>
  );
};

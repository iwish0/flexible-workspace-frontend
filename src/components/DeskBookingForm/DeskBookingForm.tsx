import {
  DeskBookingService,
  SearchDeskCriteria
} from '../../shared/services/rest/desk-booking.service';
import { BookingConfirmModal, BookingConfirmationModalData } from '../BookingConfirmModal/BookingConfirmModal';
import { DeskBooking, DeskBookingState } from '../../shared/models/rest/desk-booking.model';
import { ErrorHandlerService } from '../../shared/services/ihm/error-handler.service';
import { OfficeLayoutSVGData } from '../../shared/models/rest/office-layout.model';
import { DD_MM_YYYY } from '../../shared/constants/date.constant';
import { LOCALE } from '../../shared/constants/locale.constant';
import { HEURE } from '../../shared/constants/label.constant';
import { OfficeLayout } from '../OfficeLayout/OfficeLayout';
import { Field } from '../../shared/models/ihm/form.model';
import { FunctionComponent, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Loading } from '@nextui-org/react';
import DatePicker from 'react-datepicker';
import './DeskBookingForm.css';
import { useSnackbar } from '../../shared/context/snackbarProvider';
import { SnackbarVariant } from '../../shared/models/ihm/snackbar.model';
import { DateHelper } from '../../shared/helpers/date.helper';

type Form = {
  checkInDateTime: Field<Date>;
  checkOutDateTime: Field<Date>;
};

export const DeskBookingForm: FunctionComponent = () => {
  const addSnackbar = useSnackbar();
  const [form, setForm] = useState<Form>({
    checkInDateTime: { value: new Date(), isValid: true },
    checkOutDateTime: { value: new Date(), isValid: true }
  });

  const [listOfficeLayoutSVGData, setListOfficeLayoutSVGData] = useState<OfficeLayoutSVGData[]>([]);
  const [isBookingConfirmModalVisible, setIsBookingConfirmModalVisible] = useState<boolean>(false);
  const [bookingConfirmationModalData, setBookingConfirmationModalData] = useState<BookingConfirmationModalData>({ checkInDate: '', checkOutDate: '', placeName: '' });
  const [selectedDesk, setSelectedDesk] = useState<DeskBookingState | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (selectedDesk) {
      setBookingConfirmationModalData(data => {
        return {
          ...data,
          checkInDate: DateHelper.formatDate(selectedDesk.searchCriteria.checkInDateTime),
          checkOutDate: DateHelper.formatDate(selectedDesk.searchCriteria.checkOutDateTime),
          placeName: selectedDesk.deskInfo.name
        }
      });
    }
    setIsBookingConfirmModalVisible(true);
  }, [selectedDesk]);

  const onSelectDesk = (deskBookingState: DeskBookingState) => {
    setSelectedDesk(deskBookingState);
  };

  const closeBookingConfirmModal = (): void => {
    setIsBookingConfirmModalVisible(false);
  };

  const onConfirmBooking = async (comment: string) => {
    setLoading(true);
    closeBookingConfirmModal();
    if (selectedDesk) {
      const deskBooking: DeskBooking = {
        user: {
          email: 'c.bresson@proxiad.com',
          id: 123456789,
          name: 'John DOE'
        },
        comment,
        checkInDateTime: selectedDesk.searchCriteria.checkInDateTime,
        checkOutDateTime: selectedDesk.searchCriteria.checkOutDateTime,
        deskId: selectedDesk.deskInfo._id
      };
      try {
        await DeskBookingService.create(deskBooking);
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

  const getOfficeLayoutWithDeskBookingsState = async () => {
    setLoading(true);

    try {
      const criteria: SearchDeskCriteria = {
        checkInDateTime: form.checkInDateTime.value,
        checkOutDateTime: form.checkOutDateTime.value
      }
      const result: OfficeLayoutSVGData[] =
        await DeskBookingService.getOfficeLayoutWithDeskBookingsState(criteria);
      setListOfficeLayoutSVGData(result);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container'>
      {loading ? (
        <Loading className='container' color={'secondary'} size='xl' />
      ) : (
        <div>
          <div className='blocForm'>
            <h2>Rechercher un bureau de disponible</h2>
            <form className='form' onSubmit={handleSubmit}>
              <div className='form-group'>
                <label>Date de début</label>
                <DatePicker
                  className='datepicker'
                  selected={form.checkInDateTime.value}
                  onChange={onChangeCheckInDate}
                  locale={LOCALE}
                  dateFormat={DD_MM_YYYY}
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
                />
              </div>
              <Button type='submit' color={'primary'}>
                Rechercher
              </Button>
            </form>
          </div>
          <OfficeLayout
            listOfficeLayoutSVGData={listOfficeLayoutSVGData}
            onSelectDesk={onSelectDesk}
          />
          {selectedDesk && (
            <BookingConfirmModal
              visible={isBookingConfirmModalVisible}
              onCancel={closeBookingConfirmModal}
              onConfirm={onConfirmBooking}
              bookingConfirmationModalData={bookingConfirmationModalData}
            />
          )}
        </div>
      )}
    </div>
  );
};

import { DeskBookingService, SearchDeskCriteria } from '../../shared/services/rest/desk-booking.service';
import { DeskBookingConfirmModal } from '../DeskBookingConfirmModal/DeskBookingConfirmModal';
import { DeskBooking, DeskBookingState } from '../../shared/models/rest/desk-booking.model';
import { ErrorHandlerService } from '../../shared/services/ihm/error-handler.service';
import { OfficeLayoutSVGData } from '../../shared/models/rest/office-layout.model';
import { DD_MM_YYYY } from '../../shared/constants/date.constant';
import { LOCALE } from '../../shared/constants/locale.constant';
import { HEURE } from '../../shared/constants/label.constant';
import { OfficeLayout } from '../OfficeLayout/OfficeLayout';
import { Field } from '../../shared/models/ihm/form.model';
import { FunctionComponent, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Loading } from '@nextui-org/react';
import DatePicker from 'react-datepicker';
import './DeskBookingForm.css';

type Form = {
    checkInDateTime: Field<Date>;
    checkOutDateTime: Field<Date>;
}

export const DeskBookingForm: FunctionComponent = () => {
    const [form, setForm] = useState<Form>({
        checkInDateTime: { value: new Date(), isValid: true },
        checkOutDateTime: { value: new Date(), isValid: true }
    });

    const [listOfficeLayoutSVGData, setListOfficeLayoutSVGData] = useState<OfficeLayoutSVGData[]>([]);
    const [isBookingConfirmModalVisible, setIsBookingConfirmModalVisible] = useState<boolean>(false);
    const [selectedDesk, setSelectedDesk] = useState<DeskBookingState | undefined>();
    const [loading, setLoading] = useState<boolean>(false);

    const onSelectDesk = (deskBookingState: DeskBookingState) => {
        setIsBookingConfirmModalVisible(true);
        setSelectedDesk(deskBookingState);
    }

    const closeBookingConfirmModal = (): void => {
        setIsBookingConfirmModalVisible(false);
    }

    const onConfirmBooking = async (comment: string) => {
        setLoading(true);
        setIsBookingConfirmModalVisible(false);
        if (selectedDesk) {
            const deskBooking: DeskBooking = {
                user: {
                    email: 'john_doe@gmail.com',
                    id: 123,
                    name: 'John DOE'
                },
                comment,
                checkInDateTime: selectedDesk.searchCriteria.checkInDateTime,
                checkOutDateTime: selectedDesk.searchCriteria.checkOutDateTime,
                deskId: selectedDesk.deskInfo._id
            }
            try {
                await DeskBookingService.create(deskBooking);
                getOfficeLayoutWithDeskBookingsState();
            } catch (error: any) {
                ErrorHandlerService.handleError(error);
            } finally {
                setLoading(false);
            }
        }
    }

    const onChangeCheckInDate = (date: Date): void => {
        setForm((form) => { return { ...form, checkInDateTime: { value: date, isValid: true } } });
    }

    const onChangeCheckOutDate = (date: Date): void => {
        setForm((form) => { return { ...form, checkOutDateTime: { value: date, isValid: true } } });
    }

    async function handleSubmit(e: any): Promise<void> {
        e.preventDefault();
        setLoading(true);
        try {
            await getOfficeLayoutWithDeskBookingsState();
        } finally {
            setLoading(false);
        }
    }

    const getOfficeLayoutWithDeskBookingsState = async () => {
        try {
            const criteria: SearchDeskCriteria = {
                checkInDateTime: form.checkInDateTime.value,
                checkOutDateTime: form.checkOutDateTime.value
            };
            const result: OfficeLayoutSVGData[] = await DeskBookingService.getOfficeLayoutWithDeskBookingsState(criteria);
            setListOfficeLayoutSVGData(result);
        } catch (error: any) {
            ErrorHandlerService.handleError(error);
        }
    }

    return (
        <div className='container'>
            {loading ? (<Loading className='container' color={'secondary'} size='xl' />) : (
                <div>
                    <div className='blocForm'>
                        <h2>Rechercher un bureau de disponible</h2>
                        <form className='form' onSubmit={handleSubmit} >
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
                            <Button type='submit' color={'primary'}>Rechercher</Button>
                        </form>
                    </div>
                    <OfficeLayout listOfficeLayoutSVGData={listOfficeLayoutSVGData} onSelectDesk={onSelectDesk} />
                    {selectedDesk &&
                        <DeskBookingConfirmModal
                            visible={isBookingConfirmModalVisible}
                            onCancel={closeBookingConfirmModal}
                            onConfirm={onConfirmBooking}
                            deskInfo={selectedDesk.deskInfo}
                            searchCriteria={selectedDesk.searchCriteria}
                        />
                    }
                </div>)}
        </div>
    )
}
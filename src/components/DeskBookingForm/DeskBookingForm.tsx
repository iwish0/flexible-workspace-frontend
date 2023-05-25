import { DeskBookingService, SearchDeskCriteria } from '../../shared/services/desk-booking.service';
import { DatePickerFomat } from '../../shared/constants/date.constant';
import { LOCALE } from '../../shared/constants/locale.constant';
import { HEURE } from '../../shared/constants/label.constant';
import { Field } from '../../shared/models/form.model';
import { FunctionComponent, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

type Form = {
    checkInDate: Field<Date>;
    checkOutDate: Field<Date>;
}

export const DeskBookingForm: FunctionComponent = () => {
    const [form, setForm] = useState<Form>({
        checkInDate: { value: new Date(), isValid: true },
        checkOutDate: { value: new Date(), isValid: true }
    });

    const onChangeCheckInDate = (date: Date): void => {
        setForm((form) => { return { ...form, checkInDate: { value: date, isValid: true } } })
    }

    const onChangeCheckOutDate = (date: Date): void => {
        setForm((form) => { return { ...form, checkOutDate: { value: date, isValid: true } } })
    }

    const handleSubmit = (e: any): void => {
        e.preventDefault();
        const criteria: SearchDeskCriteria = {
            checkInDate: form.checkInDate.value,
            checkOutDate: form.checkOutDate.value
        };
        DeskBookingService.searchAvailableDesk(criteria)
    }

    return (
        <div className='container'>
            <h2>Rechercher un bureau de disponible</h2>
            <form onSubmit={handleSubmit} >
                <div className='form-group'>
                    <label>Date de début</label>
                    <DatePicker
                        selected={form.checkInDate.value}
                        onChange={onChangeCheckInDate}
                        showTimeSelect
                        timeCaption={HEURE}
                        timeIntervals={15}
                        locale={LOCALE}
                        dateFormat={DatePickerFomat.DD_MM_YYYY}
                    />
                </div>
                <div className='form-group'>
                    <label>Date de fin</label>
                    <DatePicker
                        selected={form.checkOutDate.value}
                        onChange={onChangeCheckOutDate}
                        showTimeSelect
                        timeCaption={HEURE}
                        timeIntervals={15}
                        locale={LOCALE}
                        dateFormat={DatePickerFomat.DD_MM_YYYY}
                    />
                </div>
                <button type="submit">Rechercher</button>
            </form>
        </div>
    )
}
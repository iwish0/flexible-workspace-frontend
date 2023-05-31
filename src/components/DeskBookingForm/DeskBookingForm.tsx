import { DeskBookingService, SearchDeskCriteria } from '../../shared/services/desk-booking.service';
import { DatePickerFomat } from '../../shared/constants/date.constant';
import { LOCALE } from '../../shared/constants/locale.constant';
import { HEURE } from '../../shared/constants/label.constant';
import { Field } from '../../shared/models/form.model';
import { FunctionComponent, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { OfficePlan } from '../OfficePlan/OfficePlan';
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

    const onChangeCheckInDate = (date: Date): void => {
        setForm((form) => { return { ...form, checkInDateTime: { value: date, isValid: true } } });
    }

    const onChangeCheckOutDate = (date: Date): void => {
        setForm((form) => { return { ...form, checkOutDateTime: { value: date, isValid: true } } });
    }

    const handleSubmit = (e: any): void => {
        e.preventDefault();
        const criteria: SearchDeskCriteria = {
            checkInDateTime: form.checkInDateTime.value,
            checkOutDateTime: form.checkOutDateTime.value
        };
        DeskBookingService.getListDeskBookingState(criteria)
    }

    return (
        <div className='container'>
            <h2>Rechercher un bureau de disponible</h2>
            <form className='form' onSubmit={handleSubmit} >
                <div className='form-group'>
                    <label>Date de début</label>
                    <DatePicker
                        selected={form.checkInDateTime.value}
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
                        selected={form.checkOutDateTime.value}
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

            <OfficePlan />
        </div>
    )
}
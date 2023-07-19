import { DD_MM_YYYY } from '../constants/date.constant';
import * as datefn from 'date-fns';

export class DateHelper {

    public static formatDate(date: Date | string, template: string = DD_MM_YYYY): string {
        const dateToFormat: Date = typeof date === 'string' ? new Date(date) : date;
        return DateHelper.isDateValid(dateToFormat) ? datefn.format(dateToFormat, template) : '';
    }

    public static isDateValid(date: unknown): boolean {
        return datefn.isValid(date)
    }

    public static getHourAndMinutFromDate(date: Date): string {
        if (!DateHelper.isDateValid(date)) {
            return '';
        }
        return `${date.getHours()}:${date.getMinutes()}`;
    }
}
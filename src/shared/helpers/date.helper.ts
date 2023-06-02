import { DD_MM_YYYY } from '../constants/date.constant';
import * as datefn from 'date-fns';

export class DateHelper {

    public static formatDate(date: Date | string, template: string = DD_MM_YYYY): string | null {
        const dateToFormat: Date = typeof date === 'string' ? new Date(date) : date;
        return DateHelper.isDateValid(dateToFormat) ? datefn.format(dateToFormat, template) : null;
    }

    public static isDateValid(date: any): boolean {
        return datefn.isValid(date)
    }
}
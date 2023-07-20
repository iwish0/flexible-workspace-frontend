import { AN_ERROR_OCCURED } from '../../constants/label.constant';
import { AxiosError } from 'axios';

export class ErrorInformation {
    constructor(public message: string, public title: string = AN_ERROR_OCCURED) { }
}

export type ErrorType = Error | AxiosError;
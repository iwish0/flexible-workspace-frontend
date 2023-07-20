import { ErrorInformation } from '../../models/ihm/error.model';
import axios, { AxiosError } from 'axios';

export class ErrorHandlerService {

    public static getErrorInformation(error: Error | AxiosError): ErrorInformation {
        if (axios.isAxiosError(error)) {
            const message: string = error.response?.data.message || error.message;
            return new ErrorInformation(message);
        }
        return new ErrorInformation(error?.message);
    }
}
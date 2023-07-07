import { LogService } from "./log.service";

export class ErrorHandlerService {

    public static handleError(e: Error) {
        ErrorHandlerService.notify(e);
        LogService.logError(e.message);
    }

    public static notify(e: Error) {
        alert(e.message);
    }
}
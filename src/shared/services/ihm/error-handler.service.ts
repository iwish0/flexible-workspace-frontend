import { LogService } from "./log.service";

export class ErrorHandlerService {

    public static handleError(e: Error) {
        this.notify(e);
        LogService.logError(e.message);
    }

    public static notify(e: Error) {
        alert(e.message);
    }
}
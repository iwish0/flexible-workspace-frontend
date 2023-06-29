import { DeskOfficeLayoutSVGData, RoomOfficeLayoutSVGData } from '../../models/rest/office-layout.model';
import { SearchResultDetail } from '../../models/ihm/search-result-detail.model';
import { DateHelper } from '../../helpers/date.helper';

export class SearchResultDetailService {

    public static formatDesksDataToSearchResultData(listOfficeLayoutSVGData: DeskOfficeLayoutSVGData[]): SearchResultDetail[] {
        return listOfficeLayoutSVGData.map(({ deskBookingState }) => {
            const { bookingInfo, deskInfo, isBooked } = deskBookingState;
            return {
                isBooked,
                placeName: deskInfo.name,
                location: deskInfo.location,
                user: isBooked ? bookingInfo.user : null,
                checkInDate: isBooked ? DateHelper.formatDate(bookingInfo.checkInDateTime) : null,
                checkoutDate: isBooked ? DateHelper.formatDate(bookingInfo.checkOutDateTime) : null,
                checkInTime: null,
                checkOutTime: null,
                maxCapacity: null,
                description: null,
                bookingState: deskBookingState
            };
        })
    }

    public static formatRoomsDataToSearchResultData(listOfficeLayoutSVGData: RoomOfficeLayoutSVGData[]): SearchResultDetail[] {
        return listOfficeLayoutSVGData.map(({ roomBookingState }) => {
            const { bookingInfo, roomInfo, isBooked } = roomBookingState;
            return {
                isBooked,
                placeName: roomInfo.name,
                location: roomInfo.location,
                maxCapacity: roomInfo.maxNumberPerson,
                user: isBooked ? bookingInfo.user : null,
                checkInDate: isBooked ? DateHelper.formatDate(bookingInfo.checkInDateTime) : null,
                checkoutDate: isBooked ? DateHelper.formatDate(bookingInfo.checkOutDateTime) : null,
                checkInTime: isBooked ? DateHelper.getHourAndMinutFromDate(new Date(bookingInfo.checkInDateTime)) : null,
                checkOutTime: isBooked ? DateHelper.getHourAndMinutFromDate(new Date(bookingInfo.checkOutDateTime)) : null,
                description: roomInfo.description,
                bookingState: roomBookingState
            };
        });
    }
}
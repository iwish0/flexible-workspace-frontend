import { DeskBookingState } from './desk-booking.model';

export type SvgRectAttribut = {
    id: string;
    height: string;
    width: string;
    x: string;
    y: string;
}

export type OfficeLayoutSVGData = {
    svgDrawAttribut: SvgRectAttribut;
    deskBookingState: DeskBookingState;
}

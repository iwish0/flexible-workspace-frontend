import { DeskBookingState } from "models/desk-booking-state";

export type SvgRectAttribut = {
    id: string;
    height: string;
    width: string;
    x: string;
    y: string;
}

export type OfficeLayoutSVGData = {
    svgDrawAttribut: SvgRectAttribut;
    svgBuisnessValue: DeskBookingState;
}

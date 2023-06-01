import { OfficeLayoutSVGData } from '../../shared/models/rest/office-layout.model';
import React, { FunctionComponent } from 'react';
import './OfficeLayout.css';
import { DeskBookingService } from '../../shared/services/rest/desk-booking.service';
import { DeskBooking } from '../../shared/models/rest/desk-booking.model';

type Props = {
    listOfficeLayoutSVGData: OfficeLayoutSVGData[]
};
export const OfficeLayout: FunctionComponent<Props> = ({ listOfficeLayoutSVGData }) => {

    const handleClick = (e: React.MouseEvent<SVGElement>) => {
        const deskName: string = e.currentTarget.id;
        const officeLayoutSGVData: OfficeLayoutSVGData | undefined = listOfficeLayoutSVGData.find(({ svgDrawAttribut }) => svgDrawAttribut.id === deskName);
        if (officeLayoutSGVData && !officeLayoutSGVData.deskBookingState.isBooked) {
            const { deskBookingState } = officeLayoutSGVData;
            const deskBooking: DeskBooking = {
                user: {
                    email: 'test@gmail.com',
                    id: 1,
                    name: 'John DOE'
                },
                comment: 'Je suis un commentaire libre',
                checkInDateTime: deskBookingState.searchCriteria.checkInDateTime,
                checkOutDateTime: deskBookingState.searchCriteria.checkOutDateTime,
                deskId: deskBookingState.deskInfo._id
            }
            DeskBookingService.create(deskBooking).catch((error) => console.log(error));
        }
    }

    return (
        <div>
            <svg width="640" height="480">
                <g className="layer">
                    <title>Layer 1</title>
                    <rect onClick={(e) => handleClick(e)} fill="#ffffff" height="248" id="svg_5" stroke="#000000" transform="matrix(1 0 0 1 0 0)" width="637" x="-17" y="-7" />
                    {listOfficeLayoutSVGData.map(({ deskBookingState, svgDrawAttribut }) => (
                        <rect key={svgDrawAttribut.id} onClick={handleClick}
                            className={
                                "rect " +
                                (deskBookingState?.isBooked ? "red" : "green") +
                                " m-4"
                            }
                            height={svgDrawAttribut.height}
                            id={svgDrawAttribut.id}
                            width={svgDrawAttribut.width}
                            x={svgDrawAttribut.x}
                            y={svgDrawAttribut.y}
                        />
                    ))}
                    <text fill="#000000" font-family="Serif" font-size="24" id="svg_13" stroke="#000000" stroke-width="0" text-anchor="middle" transform="matrix(0.868642 0 0 0.888012 13.5158 9.90421)" x="73" xmlSpace="preserve" y="65">A1</text>
                    <text fill="#000000" font-family="Serif" font-size="24" id="svg_15" stroke="#000000" stroke-width="0" text-anchor="middle" transform="matrix(1 0 0 1 0 0) matrix(0.868642 0 0 0.888012 13.5158 9.90421)" x="248.06" xmlSpace="preserve" y="70.58">A2</text>
                    <text fill="#000000" font-family="Serif" font-size="24" id="svg_16" stroke="#000000" stroke-width="0" text-anchor="middle" transform="matrix(0.868642 0 0 0.888012 13.5158 9.90421)" x="74.23" xmlSpace="preserve" y="184.31">B1</text>
                    <text fill="#000000" font-family="Serif" font-size="24" id="svg_17" stroke="#000000" stroke-width="0" text-anchor="middle" transform="matrix(1 0 0 1 0 0) matrix(0.868642 0 0 0.888012 13.5158 9.90421)" x="402.33" xmlSpace="preserve" y="70.58">A3</text>
                    <text fill="#000000" font-family="Serif" font-size="24" id="svg_18" stroke="#000000" stroke-width="0" text-anchor="middle" transform="matrix(1 0 0 1 0 0) matrix(0.868642 0 0 0.888012 13.5158 9.90421)" x="253.82" xmlSpace="preserve" y="182.06">B2</text>
                    <text fill="#000000" font-family="Serif" font-size="24" id="svg_19" stroke="#000000" stroke-width="0" text-anchor="middle" transform="matrix(1 0 0 1 0 0) matrix(0.868642 0 0 0.888012 13.5158 9.90421)" x="408.67" xmlSpace="preserve" y="185.44">B3</text>
                </g>
            </svg>
        </div>
    );
}
import { DeskBookingState } from '../../../shared/models/rest/desk-booking.model';
import { FunctionComponent } from 'react';
import './OfficeLayoutTooltip.css';

export type OfficeLayoutProps = {
    deskBookingState: DeskBookingState | null;
    isVisible: boolean;
    position: {
        top: number;
        left: number;
    };
};

export const OfficeLayoutTooltip: FunctionComponent<OfficeLayoutProps> = ({ deskBookingState, isVisible, position }) => {
    const divStyle: { left: string, top: string } = {
        left: position.left + 10 + 'px',
        top: position.top + 10 + 'px'
    };
    const userName: string = deskBookingState?.bookingInfo?.user?.name || '';
    return (<>
        {deskBookingState && isVisible && (
            <div
                className={'tooltip ' + (isVisible ? 'show' : 'hide')}
                style={divStyle}
            >
                <span>{userName}</span>
            </div>
        )}
    </>)
}
import { FunctionComponent } from 'react';
import './OfficeLayoutTooltip.css';

export type OfficeLayoutToolTipProps = {
  userName:string;
  isVisible: boolean;
  position: {
    top: number;
    left: number;
  };
};

export const OfficeLayoutTooltip: FunctionComponent<OfficeLayoutToolTipProps> = ({
  userName,
  isVisible,
  position
}) => {
  const divStyle: { left: string; top: string } = {
    left: position.left + 10 + 'px',
    top: position.top + 10 + 'px'
  };
  //const userName: string = roomBookingState?.bookingInfo?.user?.name || '';
  return (
    <>
      {userName && isVisible && (
        <div className={'tooltip ' + (isVisible ? 'show' : 'hide')} style={divStyle}>
          <span>{userName}</span>
        </div>
      )}
    </>
  );
};

/* eslint-disable react/no-unknown-property */
import {
  OfficeLayoutToolTipProps,
  OfficeLayoutTooltip
} from '../UI/OfficeLayoutTooltip2/OfficeLayoutTooltip';
import { RoomOfficeLayoutSVGData } from '../../shared/models/rest/office-layout.model';
import React, { FunctionComponent, useState } from 'react';
import './OfficeLayout.css';
import { RoomBookingState } from '../../shared/models/rest/room-booking.model';

type Props = {
  listOfficeLayoutSVGData: RoomOfficeLayoutSVGData[];
  onSelectElement: (bookingState: RoomBookingState) => void;
};
export const OfficeLayout: FunctionComponent<Props> = ({
  listOfficeLayoutSVGData,
  onSelectElement
}) => {
  const [officeLayoutTooltipProps, setOfficeLayoutTooltipProps] = useState<OfficeLayoutToolTipProps>({
    userName: '',
    isVisible: false,
    position: { top: 0, left: 0 }
  });

  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    const objectName: string = e.currentTarget.id;
    const officeLayoutSGVData: RoomOfficeLayoutSVGData | undefined = listOfficeLayoutSVGData.find(
      ({ svgDrawAttribut }) => svgDrawAttribut.id === objectName
    );
    if (officeLayoutSGVData && !officeLayoutSGVData.roomBookingState.isBooked) {
      onSelectElement(officeLayoutSGVData.roomBookingState);
    }
  };

  const showBookingDetail = (e: React.MouseEvent<SVGElement>) => {
    const deskName: string = e.currentTarget.id;
    const officeLayoutSGVData: RoomOfficeLayoutSVGData | undefined = listOfficeLayoutSVGData.find(
      ({ svgDrawAttribut }) => svgDrawAttribut.id === deskName
    );
    if (officeLayoutSGVData && officeLayoutSGVData.roomBookingState && officeLayoutSGVData.roomBookingState.isBooked) {
      const { roomBookingState } = officeLayoutSGVData;
      const { bookingInfo } = roomBookingState;
      setOfficeLayoutTooltipProps({
        userName: bookingInfo.user.name,
        isVisible: true,
        position: { left: e.pageX, top: e.pageY }
      });
    }
  };

  const hideBookingDetail = (e: React.MouseEvent<SVGElement>) => {
    setOfficeLayoutTooltipProps((officeLayoutTooltipProps) => {
      return { ...officeLayoutTooltipProps, isVisible: false };
    });
  };

  return (
    <div>
      <OfficeLayoutTooltip {...officeLayoutTooltipProps} />
      <svg width='640' height='480'>
        <g className='layer'>
          <rect
            onClick={(e) => handleClick(e)}
            fill='#ffffff'
            height='248'
            id='svg_5'
            stroke='#000000'
            transform='matrix(1 0 0 1 0 0)'
            width='637'
            x='-17'
            y='-7'
          />
          {listOfficeLayoutSVGData.map(({ roomBookingState, svgDrawAttribut }) => (
            <rect
              key={svgDrawAttribut.id}
              onClick={handleClick}
              className={'rect ' + (roomBookingState?.isBooked ? 'red' : 'green')}
              height={svgDrawAttribut.height}
              id={svgDrawAttribut.id}
              width={svgDrawAttribut.width}
              x={svgDrawAttribut.x}
              y={svgDrawAttribut.y}
              onMouseMove={(e) => showBookingDetail(e)}
              onMouseOut={(e) => hideBookingDetail(e)}
            ></rect>
          ))}
          <text
            fill='#000000'
            font-family='Serif'
            font-size='24'
            id='svg_13'
            stroke='#000000'
            stroke-width='0'
            text-anchor='middle'
            transform='matrix(0.868642 0 0 0.888012 13.5158 9.90421)'
            x='73'
            xmlSpace='preserve'
            y='65'
          >
            A1
          </text>
          <text
            fill='#000000'
            font-family='Serif'
            font-size='24'
            id='svg_15'
            stroke='#000000'
            stroke-width='0'
            text-anchor='middle'
            transform='matrix(1 0 0 1 0 0) matrix(0.868642 0 0 0.888012 13.5158 9.90421)'
            x='248.06'
            xmlSpace='preserve'
            y='70.58'
          >
            A2
          </text>
          <text
            fill='#000000'
            font-family='Serif'
            font-size='24'
            id='svg_16'
            stroke='#000000'
            stroke-width='0'
            text-anchor='middle'
            transform='matrix(0.868642 0 0 0.888012 13.5158 9.90421)'
            x='74.23'
            xmlSpace='preserve'
            y='184.31'
          >
            B1
          </text>
          <text
            fill='#000000'
            font-family='Serif'
            font-size='24'
            id='svg_17'
            stroke='#000000'
            stroke-width='0'
            text-anchor='middle'
            transform='matrix(1 0 0 1 0 0) matrix(0.868642 0 0 0.888012 13.5158 9.90421)'
            x='402.33'
            xmlSpace='preserve'
            y='70.58'
          >
            A3
          </text>
          <text
            fill='#000000'
            font-family='Serif'
            font-size='24'
            id='svg_18'
            stroke='#000000'
            stroke-width='0'
            text-anchor='middle'
            transform='matrix(1 0 0 1 0 0) matrix(0.868642 0 0 0.888012 13.5158 9.90421)'
            x='253.82'
            xmlSpace='preserve'
            y='182.06'
          >
            B2
          </text>
          <text
            fill='#000000'
            font-family='Serif'
            font-size='24'
            id='svg_19'
            stroke='#000000'
            stroke-width='0'
            text-anchor='middle'
            transform='matrix(1 0 0 1 0 0) matrix(0.868642 0 0 0.888012 13.5158 9.90421)'
            x='408.67'
            xmlSpace='preserve'
            y='185.44'
          >
            B3
          </text>
        </g>
      </svg>
    </div>
  );
};

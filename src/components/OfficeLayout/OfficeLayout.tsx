import { OfficeLayoutSVGData } from '../../shared/models/ihm/rest/office-layout.model';
import { FunctionComponent } from 'react';
import './OfficeLayout.css';

type Props = {
    listOfficeLayoutSVGData: OfficeLayoutSVGData[]
};
export const OfficeLayout: FunctionComponent<Props> = ({ listOfficeLayoutSVGData }) => {

    const handleClick = (e: any) => {
        const result=prompt('email de confirmation');
        console.log('result',result)
        
    }

    return (
        <div>
            <svg width="640" height="480">
                <g className="layer">
                    <title>Layer 1</title>
                    <rect onClick={handleClick} fill="#ffffff" height="248" id="svg_5" stroke="#000000" transform="matrix(1 0 0 1 0 0)" width="637" x="-17" y="-7" />
                    {listOfficeLayoutSVGData.map(({ svgBuisnessValue, svgDrawAttribut }) => (
                        <rect key={svgDrawAttribut.id} onClick={handleClick}
                            className={
                                "rect " +
                                (svgBuisnessValue?.isBooked ? "red" : "green") +
                                " m-4"
                            }
                            height={svgDrawAttribut.height}
                            id="svg_7"
                            width={svgDrawAttribut.width}
                            x={svgDrawAttribut.x}
                            y={svgDrawAttribut.y}
                        />
                    ))}




                    {/* <rect onClick={handleClick} className={isAvailable ? 'green' : 'red'} fill="#00ff00" height={svgRectAttributs[0].height} id="A1" stroke="#000000" width="75" x="39" y="28" />
                    <rect onClick={handleClick} className={isAvailable ? 'green' : 'red'} fill="#00ff00" height="69" id="svg_6" stroke="#000000" width="75" x="43" y="133" />
                    <rect onClick={handleClick} fill="#00ff00" height="69" id="svg_7" stroke="#000000" width="75" x="189" y="30" />
                    <rect onClick={handleClick} fill="#00ff00" height="69" id="svg_8" stroke="#000000" width="75" x="326" y="31" />
                    <rect onClick={handleClick} fill="#00ff00" height="69" id="svg_10" stroke="#000000" width="75" x="191" y="134" />
                    <rect onClick={handleClick} fill="#00ff00" height="69" id="svg_11" stroke="#000000" width="75" x="331" y="135" /> */}
                    <text fill="#000000" font-family="Serif" font-size="24" id="svg_13" stroke="#000000" stroke-width="0" text-anchor="middle" transform="matrix(0.868642 0 0 0.888012 13.5158 9.90421)" x="73" xmlSpace="preserve" y="65">A1</text>
                    <text fill="#000000" font-family="Serif" font-size="24" id="svg_15" stroke="#000000" stroke-width="0" text-anchor="middle" transform="matrix(1 0 0 1 0 0) matrix(0.868642 0 0 0.888012 13.5158 9.90421)" x="248.06" xmlSpace="preserve" y="70.58">A2</text>
                    <text fill="#000000" font-family="Serif" font-size="24" id="svg_16" stroke="#000000" stroke-width="0" text-anchor="middle" transform="matrix(0.868642 0 0 0.888012 13.5158 9.90421)" x="74.23" xmlSpace="preserve" y="184.31">B1</text>
                    <text fill="#000000" font-family="Serif" font-size="24" id="svg_17" stroke="#000000" stroke-width="0" text-anchor="middle" transform="matrix(1 0 0 1 0 0) matrix(0.868642 0 0 0.888012 13.5158 9.90421)" x="402.33" xmlSpace="preserve" y="70.58">A3</text>
                    <text fill="#000000" font-family="Serif" font-size="24" id="svg_18" stroke="#000000" stroke-width="0" text-anchor="middle" transform="matrix(1 0 0 1 0 0) matrix(0.868642 0 0 0.888012 13.5158 9.90421)" x="253.82" xmlSpace="preserve" y="182.06">B2</text>
                    <text fill="#000000" font-family="Serif" font-size="24" id="svg_19" stroke="#000000" stroke-width="0" text-anchor="middle" transform="matrix(1 0 0 1 0 0) matrix(0.868642 0 0 0.888012 13.5158 9.90421)" x="408.67" xmlSpace="preserve" y="185.44">B3</text>
                </g>
            </svg>
        </div>


        /*
        <svg width="640" height="480">
                        <g className="layer">
                            <title>Layer 1</title>
                            <rect onClick={handleClick} fill="#ffffff" height="248" id="svg_5" stroke="#000000" transform="matrix(1 0 0 1 0 0)" width="637" x="-17" y="-7" />
                            <rect onClick={handleClick} className={isAvailable ? 'green' : 'red'} fill="#00ff00" height={svgRectAttributs[0].height} id="A1" stroke="#000000" width="75" x="39" y="28" />
                            <rect onClick={handleClick} className={isAvailable ? 'green' : 'red'} fill="#00ff00" height="69" id="svg_6" stroke="#000000" width="75" x="43" y="133" />
                            <rect onClick={handleClick} fill="#00ff00" height="69" id="svg_7" stroke="#000000" transform="matrix(1 0 0 1 0 0)" width="75" x="189" y="30" />
                            <rect onClick={handleClick} fill="#00ff00" height="69" id="svg_8" stroke="#000000" transform="matrix(1 0 0 1 0 0)" width="75" x="326" y="31" />
                            <rect onClick={handleClick} fill="#00ff00" height="69" id="svg_10" stroke="#000000" transform="matrix(1 0 0 1 0 0)" width="75" x="191" y="134" />
                            <rect onClick={handleClick} fill="#00ff00" height="69" id="svg_11" stroke="#000000" transform="matrix(1 0 0 1 0 0)" width="75" x="331" y="135" />
                            <text fill="#000000" font-family="Serif" font-size="24" id="svg_13" stroke="#000000" stroke-width="0" text-anchor="middle" transform="matrix(0.868642 0 0 0.888012 13.5158 9.90421)" x="73" xmlSpace="preserve" y="65">A1</text>
                            <text fill="#000000" font-family="Serif" font-size="24" id="svg_15" stroke="#000000" stroke-width="0" text-anchor="middle" transform="matrix(1 0 0 1 0 0) matrix(0.868642 0 0 0.888012 13.5158 9.90421)" x="248.06" xmlSpace="preserve" y="70.58">A2</text>
                            <text fill="#000000" font-family="Serif" font-size="24" id="svg_16" stroke="#000000" stroke-width="0" text-anchor="middle" transform="matrix(0.868642 0 0 0.888012 13.5158 9.90421)" x="74.23" xmlSpace="preserve" y="184.31">B1</text>
                            <text fill="#000000" font-family="Serif" font-size="24" id="svg_17" stroke="#000000" stroke-width="0" text-anchor="middle" transform="matrix(1 0 0 1 0 0) matrix(0.868642 0 0 0.888012 13.5158 9.90421)" x="402.33" xmlSpace="preserve" y="70.58">A3</text>
                            <text fill="#000000" font-family="Serif" font-size="24" id="svg_18" stroke="#000000" stroke-width="0" text-anchor="middle" transform="matrix(1 0 0 1 0 0) matrix(0.868642 0 0 0.888012 13.5158 9.90421)" x="253.82" xmlSpace="preserve" y="182.06">B2</text>
                            <text fill="#000000" font-family="Serif" font-size="24" id="svg_19" stroke="#000000" stroke-width="0" text-anchor="middle" transform="matrix(1 0 0 1 0 0) matrix(0.868642 0 0 0.888012 13.5158 9.90421)" x="408.67" xmlSpace="preserve" y="185.44">B3</text>
                        </g>
                    </svg>
        
        */
    );
}
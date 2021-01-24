import React from 'react';
import { TumblerBoard } from '../logic/TumblerBoard';
import { TumblerCrossover, TumblerPart, TumblerRamp } from '../logic/TumblerPart';
import { TumblerPartType } from '../logic/TumblerTypes';
import { EmptyGearPart, EmptyPart, NoPart } from './EmptyPart';
import { Ramp } from './Ramp';
import './Board.css'
import { Trigger } from './Trigger';
import { Dispenser } from './Dispenser';
import { Bit } from './Bit';
import { TumblerBit } from '../logic/TumblerBit';
import { Crossover } from './Crossover';
import { PartContainer } from './PartContainer';
import { Gear } from './Gear';
import { TumblerGear } from '../logic/TumblerGear';
import { GearBit } from './GearBit';
import { TumblerGearBit } from '../logic/TumblerGearBit';
import { TumblerInterceptor } from '../logic/TumblerInterceptor';
import { Interceptor } from './Interceptor';


interface BoardProps {
    test: string,
    board: TumblerBoard,
    onClickCallback: (colIndex: number, rowIndex: number) => void
}

export const Board : React.FC<BoardProps> = ({test, board, onClickCallback}) => {

    

    const renderPartGrid = () => {
        return <div className='part-grid'>
            {renderParts()}
        </div>
    }

    const renderParts = () => board.parts.map((row, rowIndex) => row.map((part, colIndex) => renderPart(part, colIndex, rowIndex)));

    const getCurriedOnClick = (colIndex: number, rowIndex: number) => () => onClickCallback(colIndex, rowIndex);

    const renderPart = (part: TumblerPart, colIndex: number, rowIndex:number) => {
        const renderPartInner = (part: TumblerPart) => {
            switch (part.partType) {
                case TumblerPartType.NoPart:
                    return <NoPart></NoPart>;
                case TumblerPartType.EmptyPartPeg:
                    return <EmptyPart></EmptyPart>;        
                case TumblerPartType.EmptyGearPeg:
                    return <EmptyGearPart></EmptyGearPart>;
                case TumblerPartType.Ramp:
                    return <Ramp ramp={part as TumblerRamp}></Ramp>;
                case TumblerPartType.Bit:
                    return <Bit bit={part as TumblerBit}></Bit>;
                case TumblerPartType.Crossover:
                    return <Crossover crossover={part as TumblerCrossover}></Crossover>;
                case TumblerPartType.GearBit:
                    return <GearBit bit={part as TumblerGearBit}></GearBit>
                case TumblerPartType.Gear:
                    return <Gear gear={part as TumblerGear}></Gear>;
                case TumblerPartType.Interceptor:
                    return <Interceptor interceptor={part as TumblerInterceptor}></Interceptor>;
                default:
                    return <NoPart></NoPart>;
            }
        }

        let id = rowIndex * 100 + colIndex;
        return <PartContainer key={id} onClick={getCurriedOnClick(colIndex, rowIndex)}>{renderPartInner(part)}</PartContainer>;
    }

    return (
    <>
        <div>it's a board alright</div>
        <div>{test}</div>
        <Dispenser dispenser={board.blueDispenser} ></Dispenser>
        {renderPartGrid()}
        <Trigger receiver={board.blueCollector}></Trigger>
    </>);
}
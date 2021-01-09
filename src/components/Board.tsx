import React, { useState } from 'react';
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


interface BoardProps {
    columns: number,
    rows: number,
    test: string
}

export const Board : React.FC<BoardProps> = ({columns, rows, test}) => {

    const getInitialBoard = () => {
        let ret = new TumblerBoard(columns, rows);
        ret.setPart(TumblerPartType.Bit, 3, 0, true);
        ret.setPart(TumblerPartType.Bit, 2, 1, false);
        ret.setPart(TumblerPartType.Ramp, 3, 2, true);
        ret.setPart(TumblerPartType.Ramp, 1, 2, false);
        ret.setPart(TumblerPartType.Crossover, 2, 3);
        ret.setPart(TumblerPartType.Ramp, 3, 4, true);
        ret.setPart(TumblerPartType.Ramp, 1, 4, false);
        ret.setPart(TumblerPartType.Ramp, 2, 5, true);
        ret.setPart(TumblerPartType.Ramp, 1, 6, false);
        ret.setPart(TumblerPartType.Ramp, 2, 7, true);
        ret.setPart(TumblerPartType.Ramp, 1, 8, false);
        ret.setPart(TumblerPartType.Ramp, 2, 9, false);
        ret.setPart(TumblerPartType.Ramp, 0, 5, false);
        ret.setPart(TumblerPartType.Gear, 5, 1, true);
        ret.setPart(TumblerPartType.GearBit, 4, 1, true);
        ret.setPart(TumblerPartType.GearBit, 5, 2, true);
        ret.setPart(TumblerPartType.Ramp, 4, 3, true);
        ret.blueDispenser.addBalls(10);
        return ret;
    }
    const [board] = useState(getInitialBoard());
    const [boardVersion, setBoardversion] = useState(0);

    const renderPartGrid = () => {
        return <div className='part-grid'>
            {renderParts()}
        </div>
    }

    const renderParts = () => board.parts.map((row, rowIndex) => row.map((part, colIndex) => renderPart(part, colIndex, rowIndex)));
        /*for (let row=0; row<rows; ++row) {
            for (let column=0; column<columns; ++column) {
                let part = board.getPart(column, row);
            }    
        }*/

    const onClick = (colIndex: number, rowIndex: number) => {
        console.log(`board got click at (${colIndex}, ${rowIndex})`);
        board.setPart(TumblerPartType.Crossover, colIndex, rowIndex);
        setBoardversion(boardVersion + 1);
    }

    const getCurriedOnClick = (colIndex: number, rowIndex: number) => () => onClick(colIndex, rowIndex);

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
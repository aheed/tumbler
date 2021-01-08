import React, { useEffect, useState } from 'react';
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


interface BoardProps {
    columns: number,
    rows: number,
    test: string
}

export const Board : React.FC<BoardProps> = ({columns, rows, test}) => {

    const getInitialBoard = () => {
        let ret = new TumblerBoard(columns, rows);
        ret.setPart(TumblerPartType.Ramp, 3, 0, true);
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
        ret.blueDispenser.addBalls(10);
        return ret;
    }
    const [board] = useState(getInitialBoard());

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

    const renderPart = (part: TumblerPart, colIndex: number, rowIndex:number) => {
        let id = rowIndex * 100 + colIndex;
        switch (part.partType) {
            case TumblerPartType.NoPart:
                return <NoPart key={id}></NoPart>;
            case TumblerPartType.EmptyPartPeg:
                return <EmptyPart key={id}></EmptyPart>;        
            case TumblerPartType.EmptyGearPeg:
                return <EmptyGearPart key={id}></EmptyGearPart>;
            case TumblerPartType.Ramp:
                return <Ramp ramp={part as TumblerRamp} key={id}></Ramp>;
            case TumblerPartType.Bit:
                return <Bit bit={part as TumblerBit} key={id}></Bit>;
            case TumblerPartType.Crossover:
                return <Crossover crossover={part as TumblerCrossover} key={id}></Crossover>;
            case TumblerPartType.GearBit:
            case TumblerPartType.Gear:
            case TumblerPartType.Interceptor:      
            default:
                return <NoPart key={id}></NoPart>;
        }
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
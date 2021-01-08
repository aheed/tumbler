import React, { useEffect, useState } from 'react';
import { TumblerBoard } from '../logic/TumblerBoard';
import { TumblerPart, TumblerRamp } from '../logic/TumblerPart';
import { TumblerPartType } from '../logic/TumblerTypes';
import { EmptyGearPart, EmptyPart, NoPart } from './EmptyPart';
import { Ramp } from './Ramp';
import './Board.css'
import { Trigger } from './Trigger';
import { Dispenser } from './Dispenser';


interface BoardProps {
    columns: number,
    rows: number,
    test: string
}

export const Board : React.FC<BoardProps> = ({columns, rows, test}) => {

    const [board] = useState(new TumblerBoard(columns, rows));

    useEffect(() => {
        // TEMP: set up initial parts
        board.setPart(TumblerPartType.Ramp, 3, 0, true);
    }, [board]);


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
            case TumblerPartType.Crossover:
            case TumblerPartType.Bit:
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
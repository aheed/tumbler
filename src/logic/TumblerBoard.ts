import { pathToFileURL } from "url";
import { BallCollector } from "./BallCollector";
import { BallDispenser } from "./BallDispenser";
import { EmptyReceiver, EmptyTumblerPart, TumblerPart } from "./TumblerPart";
import { TumblerPartFactory } from "./TumblerPartFactory";
import { IBallReceiver, TumblerBallColor, TumblerPartType } from "./TumblerTypes";

export class TumblerBoard {
    blueDispenser: BallDispenser;
    redDispenser: BallDispenser;
    blueCollector: IBallReceiver;
    redCollector: IBallReceiver;
    private parts: TumblerPart[][];
    columns: number;
    rows: number;

    constructor(columns: number, rows: number) {

        this.columns = columns;
        this.rows = rows;

        this.parts = [];

        // create array of placeholder parts. Each part will be replaced.
        for(let rowIndex=0; rowIndex<rows; ++rowIndex) {
            let row:TumblerPart[] = [];
            for(let colIndex=0; colIndex<rows; ++colIndex) {
                let p = TumblerPartFactory.createPart(TumblerPartType.NoPart, new EmptyReceiver(), new EmptyReceiver());
                row.push(p);
            }
            this.parts.push(row);
        }

        this.blueDispenser = new BallDispenser(TumblerBallColor.Blue, new EmptyReceiver());
        this.redDispenser = new BallDispenser(TumblerBallColor.Red, new EmptyReceiver());

        this.blueCollector = new BallCollector(this.blueDispenser);
        this.redCollector = new BallCollector(this.redDispenser);

        // Populate the array with appropriate part types
        this.parts.forEach((row, rowIndex) => 
            row.forEach((column, colIndex) =>
                this.setPart(this.getEmptyBoardPartType(colIndex, rowIndex), colIndex, rowIndex)));
    }

    private getEmptyBoardPartType = (column: number, row: number): TumblerPartType => {

        let centerIndex = Math.floor(this.columns/2);
        let res = (column + row) % 2 == 0 ? TumblerPartType.EmptyGearPeg : TumblerPartType.EmptyPartPeg;

        if (row === (this.rows - 1)) {
            
            if (column != centerIndex) {
                res = TumblerPartType.NoPart;
            }
            else {
                res = TumblerPartType.EmptyPartPeg;
            }
        }
        else {
            if ( (column + row) < (centerIndex - 3)) {
                res = TumblerPartType.NoPart;
            }

            if (column > (centerIndex + 3 + row)) {
                res = TumblerPartType.NoPart;
            }
        }

        return res;
    }


    getPart = (column: number, row: number): TumblerPart | null => {
        if (column < 0 || column >= this.columns || row < 0 || row >= this.rows) {
            return null;
        }
        return this.parts[row][column];
    }

    setExitNW = (newExit: IBallReceiver, column: number, row: number) => {
        let ballSourcePart = this.getPart(column - 1, row - 1);
        if (!!ballSourcePart) {
            ballSourcePart.rightExit = newExit;
        }
    }

    setExitNE = (newExit: IBallReceiver, column: number, row: number) => {
        let ballSourcePart = this.getPart(column + 1, row - 1);
        if (!!ballSourcePart) {
            ballSourcePart.leftExit = newExit;
        }
    }

    setPart = (partType: TumblerPartType, column: number, row: number, facingLeft?: boolean) => {
        let leftExit = new EmptyReceiver();
        let rightExit = new EmptyReceiver();

        if ((row === (this.rows - 1)) || (row === (this.rows - 2))) {
            let centerIndex = Math.floor(this.columns/2);
            if (column < centerIndex) {
                leftExit = this.blueCollector;
                rightExit = this.blueCollector;
            }
            else if (column > centerIndex) {
                leftExit = this.redCollector;
                rightExit = this.redCollector;
            }
            else {
                leftExit = this.blueCollector;
                rightExit = this.redCollector;
            }                    
        }

        let newPart = TumblerPartFactory.createPart(partType, leftExit, rightExit, facingLeft);
        this.setExitNW(newPart.leftEntrance, column, row);
        this.setExitNE(newPart.rightEntrance, column, row);

        this.parts[row][column] = newPart;
    }

    // todo: removePart = ...  Reuse getEmptyBoardPartType
}

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
    parts: TumblerPart[][];
    columns: number;
    rows: number;

    constructor(columns: number, rows: number) {

        this.columns = columns;
        this.rows = rows;
        
        this.parts = (new Array(rows)).map((row, rowindex) => (new Array(columns)).map((part, colIndex) => {
                let leftExit = new EmptyReceiver();
                let rightExit = new EmptyReceiver();
                
                return TumblerPartFactory.createPart(TumblerPartType.NoPart, leftExit, rightExit);
            }
        ));

        this.blueDispenser = new BallDispenser(TumblerBallColor.Blue, new EmptyReceiver());
        this.redDispenser = new BallDispenser(TumblerBallColor.Red, new EmptyReceiver());

        this.blueCollector = new BallCollector(this.blueDispenser);
        this.redCollector = new BallCollector(this.redDispenser);
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
        //let oldPart = this.parts[row][column];
        let leftExit = new EmptyReceiver();
        let rightExit = new EmptyReceiver();
        let centerIndex = Math.floor(this.columns/2);

        if (row === (this.rows - 1)) {
            
            if (column != centerIndex) {
                throw new Error("illegal part placement");
            }
            leftExit = this.blueCollector;
            rightExit = this.redCollector;
        }

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
                throw new Error("illegal part placement");
            }                    
        }

        let newPart = TumblerPartFactory.createPart(partType, leftExit, rightExit, facingLeft);
        this.setExitNW(newPart.leftEntrance, column, row);
        this.setExitNE(newPart.rightEntrance, column, row);

        this.parts[row][column] = newPart;
    }
}



/*
for (let col=0; col<columns; ++col) {
            for (let row=0; col<columns; ++col) {
                
            }    
        }
        */
import { BallCollector } from "./BallCollector";
import { BallDispenser } from "./BallDispenser";
import { EmptyReceiver, EmptyTumblerPart, TumblerPart } from "./TumblerPart";
import { IBallReceiver, TumblerBallColor } from "./TumblerTypes";

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
                
                return new EmptyTumblerPart(leftExit, rightExit) ;
            }
        ));

        this.blueDispenser = new BallDispenser(TumblerBallColor.Blue, new EmptyReceiver());
        this.redDispenser = new BallDispenser(TumblerBallColor.Red, new EmptyReceiver());

        // todo: collector.setReleaser x2
        this.blueCollector = new BallCollector(this.blueDispenser);
        this.redCollector = new BallCollector(this.redDispenser);
    }

    setPart = (column: number, row: number) => {
        let oldPart = this.parts[row][column];
        let leftExit = new EmptyReceiver();

        let rightExit = new EmptyReceiver();

        if (row === (this.rows - 1)) {
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

    }
}



/*
for (let col=0; col<columns; ++col) {
            for (let row=0; col<columns; ++col) {
                
            }    
        }
        */
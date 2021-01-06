import React from 'react';
import { IBallReceiver, ITumblerPartObserver, TumblerBallColor, TumblerEvent, TumblerPartType, TumblerResult } from "./TumblerTypes";
import { TumblerCrossover, TumblerRamp } from './TumblerPart';
import { TumblerBoard } from './TumblerBoard';

const boardNofColumns = 11;
const boardNofRows = 11;

test('board created, board is populated with correct parts', async () => {
    // Arrange

    // Act
    let board = new TumblerBoard(boardNofColumns, boardNofRows);

    // Evaluate
    expect(board.getPart(0, 0)?.partType).toBe(TumblerPartType.NoPart);
    expect(board.getPart(1, 0)?.partType).toBe(TumblerPartType.NoPart);
    expect(board.getPart(2, 0)?.partType).toBe(TumblerPartType.EmptyGearPeg);
    expect(board.getPart(3, 0)?.partType).toBe(TumblerPartType.EmptyPartPeg);
    expect(board.getPart(boardNofColumns - 1, 0)?.partType).toBe(TumblerPartType.NoPart);
    expect(board.getPart(boardNofColumns - 2, 0)?.partType).toBe(TumblerPartType.NoPart);
    expect(board.getPart(boardNofColumns - 3, 0)?.partType).toBe(TumblerPartType.EmptyGearPeg);
    expect(board.getPart(boardNofColumns - 4, 0)?.partType).toBe(TumblerPartType.EmptyPartPeg);
    expect(board.getPart(0, 1)?.partType).toBe(TumblerPartType.NoPart);
    expect(board.getPart(1, 1)?.partType).toBe(TumblerPartType.EmptyGearPeg);
    expect(board.getPart(0, boardNofRows - 1)?.partType).toBe(TumblerPartType.NoPart);
    expect(board.getPart(4, boardNofRows - 1)?.partType).toBe(TumblerPartType.NoPart);
    expect(board.getPart(5, boardNofRows - 1)?.partType).toBe(TumblerPartType.EmptyPartPeg);
    expect(board.getPart(6, boardNofRows - 1)?.partType).toBe(TumblerPartType.NoPart);
    expect(board.columns).toBe(boardNofColumns);
    expect(board.rows).toBe(boardNofRows);
});
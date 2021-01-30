import React, { useState } from "react";
import { BoardModel } from "../logic/model/BoardModel";
import { TumblerBoard } from "../logic/TumblerBoard";
import { TumblerPartType } from "../logic/TumblerTypes";
import { UserTokenContext } from "../services/UserTokenContext";
import { Board } from "./Board";

interface ControllerProps {
    text: string,
    columns: number,
    rows: number,
}

interface ControllerInnerProps {
    token: string,
    controllerProps: ControllerProps
}

const ControllerInner: React.FC<ControllerInnerProps> = ({ token, controllerProps }) => {

    let { text, columns, rows } = controllerProps;

    const [response, setResponse] = useState('');

    const getInitialBoard = () => {
        let ret = new TumblerBoard(columns, rows);
        ret.setPart(TumblerPartType.Bit, 3, 0, true);
        ret.setPart(TumblerPartType.Bit, 2, 1, false);
        ret.setPart(TumblerPartType.Ramp, 3, 2, true);
        ret.setPart(TumblerPartType.Ramp, 1, 2, false);
        ret.setPart(TumblerPartType.Crossover, 2, 3);
        ret.setPart(TumblerPartType.Bit, 3, 4, true);
        ret.setPart(TumblerPartType.Interceptor, 4, 5);
        ret.setPart(TumblerPartType.Gear, 4, 6);
        ret.setPart(TumblerPartType.Ramp, 1, 4, false);
        ret.setPart(TumblerPartType.Ramp, 2, 5, true);
        ret.setPart(TumblerPartType.Ramp, 1, 6, false);
        ret.setPart(TumblerPartType.Ramp, 2, 7, true);
        ret.setPart(TumblerPartType.Ramp, 1, 8, false);
        ret.setPart(TumblerPartType.Ramp, 2, 9, false);
        ret.setPart(TumblerPartType.Ramp, 0, 5, false);
        ret.setPart(TumblerPartType.Gear, 5, 1, false);
        ret.setPart(TumblerPartType.GearBit, 4, 1, false);
        ret.setPart(TumblerPartType.GearBit, 5, 2, false);
        ret.setPart(TumblerPartType.GearBit, 6, 1, true);
        ret.setPart(TumblerPartType.Ramp, 4, 3, true);
        ret.blueDispenser.addBalls(10);
        return ret;
    }

    const [board] = useState(getInitialBoard());
    const [boardVersion, setBoardversion] = useState(0);

    const onClick = (colIndex: number, rowIndex: number) => {
        console.log(`board got click at (${colIndex}, ${rowIndex})`);
        board.setPart(TumblerPartType.Crossover, colIndex, rowIndex);
        setBoardversion(boardVersion + 1);
    }

    const save = (boardModel: BoardModel) => {
        const url = 'http://localhost:5000/api/saveboard';
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(boardModel)
        };

        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setResponse(JSON.stringify(data));
            })
            .catch(error => {
                console.error(error);
                setResponse('error!');
            });
    }

    const load = (): BoardModel | null => {
        const url = 'http://localhost:5000/api/loadboard';
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${token}`
            }
        };

        let ret = null;

        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setResponse('board loaded');
                ret = data;
            })
            .catch(error => {
                console.error(error);
                setResponse('error!');
            });

        return ret;
    }

    const onSaveClicked = () => {
        console.log(`Save button clicked`);
        let boardModel = board.getModel();
        console.log(boardModel);

        // todo:
        // Check login status

        save(boardModel);
    }

    const onLoadClicked = () => {
        console.log(`Load button clicked`);

        // todo:
        // Check login status

        let newBoard = load();

        // todo: update board state
    }

    return (
        <>
            <button onClick={onSaveClicked}>Save</button>
            <button onClick={onLoadClicked}>Load</button>
            <div>{text}</div>
            <div>{response}</div>
            <Board test='Controlled Board' board={board} onClickCallback={onClick}></Board>
        </>
    );
}

export const Controller = (props: ControllerProps) => {
    return (
        <UserTokenContext.Consumer>
            {({ token, setToken }) => (
                <ControllerInner token={token} controllerProps={props}></ControllerInner>
            )}
        </UserTokenContext.Consumer>
    );
}

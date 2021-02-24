import React, { useState } from "react";
import { EditorToolType, getPartTypeByTool } from "../logic/EditorTools";
import { BoardModel } from "../logic/model/BoardModel";
import { TumblerBoard } from "../logic/TumblerBoard";
import { TumblerPart } from "../logic/TumblerPart";
import { TumblerPartType } from "../logic/TumblerTypes";
import { UserTokenContext } from "../services/UserTokenContext";
import { Board } from "./Board";
import { ToolBar } from "./ToolBar";

interface ControllerProps {
  host: string;
  columns: number;
  rows: number;
}

interface ControllerInnerProps {
  token: string;
  controllerProps: ControllerProps;
}

const ControllerInner: React.FC<ControllerInnerProps> = ({
  token,
  controllerProps,
}) => {
  let { columns, rows } = controllerProps;

  const [response, setResponse] = useState("");

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
  };

  const [board, setBoard] = useState(getInitialBoard());
  const [boardVersion, setBoardversion] = useState(0);
  const [tool, setTool] = useState(EditorToolType.Erase);

  const getCurrentEditorTool = (): EditorToolType => {
    return tool;
  };

  const onToolSelected = (selectedTool: EditorToolType) => {
    console.log("got new tool", selectedTool);
    setTool(selectedTool);
  };

  const isPartFlippable = (partType: TumblerPartType): Boolean => {
    return (
      partType === TumblerPartType.Bit ||
      partType === TumblerPartType.Ramp ||
      partType === TumblerPartType.GearBit ||
      partType === TumblerPartType.Gear
    );
  };

  const onClick = (colIndex: number, rowIndex: number) => {
    console.log(`board got click at (${colIndex}, ${rowIndex})`);

    let targetPartType = getPartTypeByTool(getCurrentEditorTool());
    let currentPart: TumblerPart | null = board.getPart(colIndex, rowIndex);
    let facingLeft = false;

    if (!!currentPart && getCurrentEditorTool() === EditorToolType.Flip) {
      targetPartType = currentPart.partType;
      facingLeft = !currentPart.facingLeft;
    } else {
      let pegType = board.getEmptyBoardPartType(colIndex, rowIndex);
      if (pegType === TumblerPartType.NoPart) {
        return;
      } else if (pegType === TumblerPartType.EmptyPartPeg) {
        if (targetPartType === currentPart?.partType) {
          if (!isPartFlippable(targetPartType)) {
            targetPartType = null;
          } else {
            if (!currentPart.facingLeft) {
              facingLeft = true;
            } else {
              targetPartType = null;
            }
          }
        }
      } else if (pegType === TumblerPartType.EmptyGearPeg) {
        if (currentPart?.partType === TumblerPartType.Gear) {
          targetPartType = null;
        } else {
          targetPartType = TumblerPartType.Gear;
        }
      }
    }

    if (targetPartType) {
      board.setPart(targetPartType, colIndex, rowIndex, facingLeft);
    } else {
      board.removePart(colIndex, rowIndex);
    }

    setBoardversion(boardVersion + 1);
  };

  const save = (boardModel: BoardModel) => {
    const url = controllerProps.host + "/api/saveboard";
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(boardModel),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResponse(JSON.stringify(data));
      })
      .catch((error) => {
        console.error(error);
        setResponse("error!");
      });
  };

  const load = (): BoardModel | null => {
    const url = controllerProps.host + "/api/loadboard";
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    };

    let ret = null;

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResponse("board loaded");
        ret = data;

        if (!!data) {
          let newBoard = new TumblerBoard(data.columns, data.rows, data);
          console.log("board loaded**");
          setBoard(newBoard);
        }
      })
      .catch((error) => {
        console.error(error);
        setResponse("error!");
      });

    return ret;
  };

  const onSaveClicked = () => {
    console.log(`Save button clicked`);
    let boardModel = board.getModel();
    console.log(boardModel);

    // todo:
    // Check login status

    save(boardModel);
  };

  const onLoadClicked = () => {
    console.log(`Load button clicked`);

    // todo:
    // Check login status

    load();
  };

  return (
    <>
      <button onClick={onSaveClicked}>Save</button>
      <button onClick={onLoadClicked}>Load</button>
      <div>{response}</div>
      <Board
        board={board}
        onClickCallback={onClick}
      ></Board>
      <ToolBar selectedTool={tool} onToolSelected={onToolSelected}></ToolBar>
    </>
  );
};

export const Controller = (props: ControllerProps) => {
  return (
    <UserTokenContext.Consumer>
      {({ token, setToken }) => (
        <ControllerInner
          token={token}
          controllerProps={props}
        ></ControllerInner>
      )}
    </UserTokenContext.Consumer>
  );
};

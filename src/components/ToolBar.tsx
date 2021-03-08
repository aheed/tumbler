import { EditorToolType } from "../logic/EditorTools";

interface ToolBarProps {
  selectedTool: EditorToolType;
  onToolSelected: (selectedTool: EditorToolType) => void;
}

export const ToolBar: React.FC<ToolBarProps> = ({ selectedTool, onToolSelected }) => {
  const onChangeValue = (event: any) => {
    console.log(event.target.value);
    onToolSelected(parseInt(event.target.value));
  };

  const renderRadioButtons = () => {
    let values = [];
    for (const value in EditorToolType) {
      values.push(value);
    }

    return values
      .filter((value) => !isNaN(Number(value)))
      .map((tool) => (
        <div key={tool}>
          <input type="radio" id={tool} value={tool} defaultChecked={parseInt(tool) === selectedTool} onChange={onChangeValue} name="tool" />
          <label htmlFor={tool}>{EditorToolType[parseInt(tool)]}</label>
        </div>
      ));
  };

  return (
    <>
      <div>Toolbar</div>
      <div>{renderRadioButtons()}</div>
    </>
  );
};

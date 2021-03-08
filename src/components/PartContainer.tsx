import { InteractionProps } from "./Types";
import "./PartContainer.css";

export const PartContainer: React.FC<InteractionProps> = (props) => {
  return (
    <div className="part-container" onClick={props.onClick}>
      {props.children}
    </div>
  );
};

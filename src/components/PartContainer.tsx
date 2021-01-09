import { InteractionProps } from "./Types";

export const PartContainer : React.FC<InteractionProps> = (props) => {

    return (
        <div onClick={props.onClick}>
            {props.children}
        </div>
    );
}
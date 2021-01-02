import { useState } from "react";
import { UserTokenContext } from "../services/UserTokenContext";

export interface Clientprops {
    token: string
}

export const ClientInner = (props: Clientprops) => {

    const [response, setResponse] = useState('');

    const onCallClicked = () => {
        const url = 'http://localhost:5000/api/secure';
        const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization' : `Bearer ${props.token}`
        },
        body: JSON.stringify({
            a: 10,
            b: 20
        })
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

    return (
        <div className="Client">            
            <button onClick={onCallClicked}>Call API</button>
            <div>{response}</div>
        </div>
      );
}

export const Client = () => {
     return (
        <UserTokenContext.Consumer>
        {({token, setToken}) => (
            <ClientInner token={token}></ClientInner>
        )}
        </UserTokenContext.Consumer>
      );
}
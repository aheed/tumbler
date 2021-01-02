import { useState } from "react";

export interface Clientprops {
    token: string
}

export const Client = (props: Clientprops) => {

    const [response, setResponse] = useState('');

    const tmp = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjI2MTI5YmE1NDNjNTZlOWZiZDUzZGZkY2I3Nzg5ZjhiZjhmMWExYTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMzU0MjUzMzU0NzQ5LWJmcDVpYWw1azUzYWJyNG85cTVjNDRmNjZuYm5ranJuLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMzU0MjUzMzU0NzQ5LWJmcDVpYWw1azUzYWJyNG85cTVjNDRmNjZuYm5ranJuLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA2OTU2NTYxNzgzNTUzMTMwNDcxIiwiZW1haWwiOiJjcmFzc2FscGhhQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiUEZOb0EzZm9xTXh6TGRKTW1HMDBfQSIsIm5hbWUiOiJHbGVuIEdsZW5uIiwicGljdHVyZSI6Imh0dHBzOi8vbGg1Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tWXdVMF9oU1FMZ2cvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvQU1adXVjbVhseFdsUlpyMVJlbEgwOEI4X1NRMDkzVVJjZy9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiR2xlbiIsImZhbWlseV9uYW1lIjoiR2xlbm4iLCJsb2NhbGUiOiJlbiIsImlhdCI6MTYwOTYxMDU5NCwiZXhwIjoxNjA5NjE0MTk0LCJqdGkiOiI0NWQzYjIxNTc4ZTJmNzg4N2ExNGYxYzVhODIyZmI3YjA1YmFhN2MyIn0.imylCAYVmZOdH0JI7XNbWRwrJUFMyhrXeSxRm4HsVBb6xIO-HvpyC7xrc9bSIVE6aUjzTVRlXlHj_lfRxDe9IWucYy9PIMhYU-O0BohpdmxgKYedFC7WQhf54I08_BVMkoXbqwtg9QS84fwrYCswg2wqOn4-izYsOXXLrf5dcumS39tgZMzZYgRsero3QIAxINiQTVjffuxMZerrW2xNqcAWC40tuWB9KWuKZGEd6S6RVI9BmDwghz1vQJISDWD72ciDTZ2iEwl5Seci5ZHEyhEvxk6_T5j5wp636KpWikV0395CRpLRLHUiMoP2uP7NEXhs-YAOB8t6r_yeTDeXPw';

    const onCallClicked = () => {
        const url = 'http://localhost:5000/api/secure';
        const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization' : `Bearer ${tmp}`
        },
        body: JSON.stringify({
            a: 10,
            b: 20
        })
        };

        fetch(url, options)
        /*.then(response => {
            console.log(response.status);
            setResponse(JSON.stringify(response.json()));
        })*/
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

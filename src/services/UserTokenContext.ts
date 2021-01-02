import React from "react";

export const UserTokenContext = React.createContext({
    token: '',
    setToken: (token: string) => {}
});

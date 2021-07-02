import React from 'react';

const authContext = React.createContext({
    accType: null,
    companyName: null,
    companyEmail: null,
    token: null,
    login: ()=>{},
    logout: ()=>{}
});

export default authContext;
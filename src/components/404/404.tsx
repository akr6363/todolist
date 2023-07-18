import React from 'react';
import {Navigate} from "react-router-dom";
import {useAppSelector} from "../../state/hooks";

export const NotFound404 = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    if (!isLoggedIn) {
        return <Navigate to={'/'}/>
    }
    return (
        <h1 style={{textAlign: 'center'}}>404: PAGE NOT FOUND</h1>
    );
};

export default 404;
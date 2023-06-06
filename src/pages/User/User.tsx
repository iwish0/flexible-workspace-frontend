import { FunctionComponent, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './User.css';

export const User: FunctionComponent = () => {
    const [userId] = useState<number>(123);

    return (
        <>
            <h2>Espace utilisateur</h2>
            <Outlet context={{ userId }} />
        </>
    )
}
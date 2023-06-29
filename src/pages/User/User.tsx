import { FunctionComponent, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './User.css';

export const User: FunctionComponent = () => {
    const [userId] = useState<number>(123456789);

    return (
        <div className='page-content'>
            <Outlet context={{ userId }} />
        </div>
    );
}
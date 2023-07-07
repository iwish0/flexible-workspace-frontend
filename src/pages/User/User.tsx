import { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';
import './User.css';

export const User: FunctionComponent = () => {
    return (
        <div className='page-content'>
            <Outlet />
        </div>
    );
}
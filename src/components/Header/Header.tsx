import { FunctionComponent } from 'react';
import './Header.css';

export const Header: FunctionComponent = () => {
    const appTitle: string = 'Flexible Workspace';
    return <header className='header'><h1>{appTitle}</h1></header>;
}
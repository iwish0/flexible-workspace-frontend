import { FunctionComponent } from 'react';

export const Header: FunctionComponent = () => {
    const appTitle: string = 'Flexible Workspace';
    return <header><h1>{appTitle}</h1></header>;
}
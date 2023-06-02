import { FunctionComponent } from 'react';
import { Button, Link, Navbar as NavBarNextUI } from "@nextui-org/react";

import './Navbar.css';

export const Navbar: FunctionComponent = () => {
    return (
        <NavBarNextUI className='navbar'>
            <NavBarNextUI.Brand>
                Flexible Workspace
            </NavBarNextUI.Brand>
            <NavBarNextUI.Content>
                <NavBarNextUI.Item>
                    <Button auto flat as={Link} href="#">
                        Login
                    </Button>
                </NavBarNextUI.Item>
            </NavBarNextUI.Content>
        </NavBarNextUI>
    )
}
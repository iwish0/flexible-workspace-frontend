import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Link, Navbar as NavBarNextUI } from "@nextui-org/react";

import './Navbar.css';
import { USER_BOOKING_HISTORY } from '../../shared/constants/route.constant';

export const Navbar: FunctionComponent = () => {

    const navigate = useNavigate();
    const goToBookingHistory = (): void => {
        navigate(USER_BOOKING_HISTORY)
    }

    return (
        <NavBarNextUI className='navbar'>
            <NavBarNextUI.Brand>
                Flexible Workspace
            </NavBarNextUI.Brand>
            <NavBarNextUI.Content>
                <NavBarNextUI.Link onClick={goToBookingHistory} href="#">Historique</NavBarNextUI.Link>
                <NavBarNextUI.Item>
                    <Button auto flat as={Link} href="#">
                        Login
                    </Button>
                </NavBarNextUI.Item>
            </NavBarNextUI.Content>
        </NavBarNextUI>
    )
}
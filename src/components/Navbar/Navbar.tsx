import { ROOT, USER_BOOKING_HISTORY } from '../../shared/constants/route.constant';
import { Button, Link, Navbar as NavBarNextUI } from "@nextui-org/react";
import { Location, NavigateFunction, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { FunctionComponent } from 'react';
import './Navbar.css';

export const Navbar: FunctionComponent = () => {
    const location: Location = useLocation();
    const navigate: NavigateFunction = useNavigate();

    const goToBookingHistory = (): void => {
        navigate(USER_BOOKING_HISTORY)
    }

    const goToBookingForm = (): void => {
        navigate(ROOT)
    }

    return (
        <NavBarNextUI>
            <NavBarNextUI.Toggle showIn="xs" />
            <NavBarNextUI.Brand>
                Flexible Workspace
            </NavBarNextUI.Brand>
            <NavBarNextUI.Content hideIn="xs" variant={'highlight-solid'}>
                <NavBarNextUI.Link
                    isActive={location.pathname === ROOT}
                    onClick={goToBookingForm} href='#'
                >Réserver
                </NavBarNextUI.Link>
                <NavBarNextUI.Link
                    isActive={location.pathname === ROOT + USER_BOOKING_HISTORY}
                    onClick={goToBookingHistory}
                    href="#">
                    Historique
                </NavBarNextUI.Link>
                <NavBarNextUI.Item css={{ ml: 20 }}>
                    <Button auto flat as={Link} href='#'>
                        Login
                    </Button>
                </NavBarNextUI.Item>
            </NavBarNextUI.Content>
            <NavBarNextUI.Collapse>
                <NavBarNextUI.CollapseItem>
                    {/* Content */}
                </NavBarNextUI.CollapseItem>
            </NavBarNextUI.Collapse>
        </NavBarNextUI>
    )
}
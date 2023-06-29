import { NavigationService } from '../../shared/services/ihm/navigation.service';
import { Location, NavigateFunction, useNavigate } from 'react-router-dom';
import { FunctionComponent, useState, useEffect, useRef } from 'react';
import { NAVBAR_ITEMS } from '../../shared/constants/navbar.constant';
import { Link, Navbar as NavBarNextUI } from '@nextui-org/react';
import { useLocation } from 'react-router-dom';
import './Navbar.css';

export const Navbar: FunctionComponent = () => {

    const location: Location = useLocation();
    const navigate: NavigateFunction = useNavigate();
    // The toogleMenu doesn't close when the user select a link. We need to get a reference of the toogle button instance to simulate a click for closing the menu
    const toogleMenuButton: React.RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>(null);
    const [selectedRoute, setSelectedRoute] = useState<string>('');

    useEffect(() => {
        setSelectedRoute(NavigationService.pathNameToRoute(location.pathname));
    }, [location.pathname]);


    const onSelectRoute = (route: string, e: React.MouseEvent<HTMLElement>): void => {
        e.preventDefault();
        if (toogleMenuButton && toogleMenuButton.current) {
            toogleMenuButton.current.click();
        }
        navigate(route);
    }

    return (
        <NavBarNextUI>
            <NavBarNextUI.Toggle
                ref={toogleMenuButton}
                showIn='xs' />
            <NavBarNextUI.Brand>
                Flexible Workspace
            </NavBarNextUI.Brand>
            <NavBarNextUI.Content hideIn='xs' variant={'highlight-solid'}>
                {NAVBAR_ITEMS.map(({ shortlabel, route }) => (
                    <NavBarNextUI.Link
                        key={route}
                        isActive={route === selectedRoute}
                        onClick={(e: React.MouseEvent<HTMLElement>) => onSelectRoute(route, e)}
                        href='#'
                    >
                        {shortlabel}
                    </NavBarNextUI.Link>
                ))}
            </NavBarNextUI.Content>
            <NavBarNextUI.Collapse showIn='xs' disableAnimation>
                {NAVBAR_ITEMS.map(({ longLabel, route }) => (
                    <NavBarNextUI.CollapseItem
                        key={route}
                        activeColor='primary'
                        isActive={route === selectedRoute}
                    >
                        <Link
                            color='inherit'
                            css={{
                                minWidth: '100%',
                            }}
                            href='#'
                            onClick={(e: React.MouseEvent<HTMLElement>) => onSelectRoute(route, e)}
                        >
                            {longLabel}
                        </Link>
                    </NavBarNextUI.CollapseItem>))}
            </NavBarNextUI.Collapse>
        </NavBarNextUI>
    )
}
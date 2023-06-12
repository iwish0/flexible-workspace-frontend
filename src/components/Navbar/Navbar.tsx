import { DESK_BOOKING_KEY, DROPDOWN_MENU_ITEMS, collapseItems } from '../../shared/constants/navbar.constant';
import { Button, Dropdown, Link, Navbar as NavBarNextUI } from '@nextui-org/react';
import { NavigationService } from '../../shared/services/ihm/navigation.service';
import { FunctionComponent, useState, Key, useEffect, useRef } from 'react';
import { Location, NavigateFunction, useNavigate } from 'react-router-dom';
import { RouteStatus } from '../../shared/models/ihm/navigation.model';
import { Route } from '../../shared/constants/route.constant';
import { useLocation } from 'react-router-dom';
import { ChevronDown } from 'react-iconly';
import './Navbar.css';

export const Navbar: FunctionComponent = () => {

    const location: Location = useLocation();
    const navigate: NavigateFunction = useNavigate();
    const [locationState, setLocationState] = useState<RouteStatus>({
        isRouteDeskBooking: false,
        isRouteUserBookingHistory: false
    });
    // The toogleMenu doesn't close when the user select a link. We need to get a reference of the toogle button instance to simulate a click for closing the menu
    const toogleMenuButton: React.RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>(null);
    const [selectedDropdownMenuItem, setSelectedDropdownMenuItem] = useState<Set<Key>>(new Set(DESK_BOOKING_KEY));
    const [selectedRoute, setSelectedRoute] = useState<string>(DESK_BOOKING_KEY);

    useEffect(() => {
        const locationStateUpdated: RouteStatus = NavigationService.getRouteStatus(location.pathname);
        setLocationState(locationStateUpdated);
        setSelectedRoute(NavigationService.pathNameToRoute(location.pathname));
    }, [location.pathname])

    const goToBookingHistory = (e: React.MouseEvent<HTMLElement>): void => {
        e.preventDefault();
        clearSelectedDropdownMenuItem();
        navigate(Route.USER_BOOKING_HISTORY);
    };

    const updateSelectedDropdownMenuItem = (key: Key): void => {
        setSelectedDropdownMenuItem((selectedDropdownMenuItem) => {
            selectedDropdownMenuItem.clear();
            return selectedDropdownMenuItem.add(key);
        });
    }

    const clearSelectedDropdownMenuItem = (): void => {
        setSelectedDropdownMenuItem((selectedDropdownMenuItem) => {
            selectedDropdownMenuItem.clear();
            return selectedDropdownMenuItem;
        });
    }

    const onSelectDropdownMenuItem = (key: Key): void => {
        updateSelectedDropdownMenuItem(key);
        navigate(key as string);
    }

    const onSelectRoute = (route: string): void => {
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
                <Dropdown isBordered>
                    <NavBarNextUI.Item>
                        <Dropdown.Button
                            auto
                            light={!locationState.isRouteDeskBooking}
                            css={{
                                mr: 20,
                                px: 0,
                                dflex: 'center',
                                svg: { flex: 0.6 },
                            }}
                            iconRight={<ChevronDown />}
                            ripple={false}
                        >
                            Réserver
                        </Dropdown.Button>
                    </NavBarNextUI.Item>
                    <Dropdown.Menu
                        color='default'
                        aria-label='Réservation d\une place ou d\une salle'
                        selectionMode='single'
                        selectedKeys={selectedDropdownMenuItem}
                        onAction={(key: Key) => onSelectDropdownMenuItem(key)}
                        css={{
                            $$dropdownMenuWidth: '340px',
                            $$dropdownItemHeight: '70px',
                            '& .nextui-dropdown-item': {
                                // dropdown item right icon
                                svg: {
                                    color: '$secondary',
                                },
                                // dropdown item title
                                '& .nextui-dropdown-item-content': {
                                    w: '100%',
                                    fontWeight: '$semibold',
                                },
                            },
                        }}
                    >
                        {DROPDOWN_MENU_ITEMS.map(({ label, icon, key, description }) => (
                            <Dropdown.Item
                                key={key}
                                showFullDescription
                                description={description}
                                icon={icon}
                            >
                                {label}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                <NavBarNextUI.Link
                    isActive={locationState.isRouteUserBookingHistory}
                    onClick={(e: React.MouseEvent<HTMLElement>) => goToBookingHistory(e)}
                    href=''>
                    Historique
                </NavBarNextUI.Link>
                <NavBarNextUI.Item css={{ ml: 20 }}>
                    <Button auto flat color={'gradient'} as={Link} href=''>
                        <span className='loginBtnLabel'>Login</span>
                    </Button>
                </NavBarNextUI.Item>
            </NavBarNextUI.Content>
            <NavBarNextUI.Collapse showIn='xs' disableAnimation>
                {collapseItems.map(({ label, route }) => (
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
                            onClick={() => onSelectRoute(route)}
                        >
                            {label}
                        </Link>
                    </NavBarNextUI.CollapseItem>))}
            </NavBarNextUI.Collapse>
        </NavBarNextUI>
    )
}
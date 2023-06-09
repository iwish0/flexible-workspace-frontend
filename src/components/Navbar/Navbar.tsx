import { DESK_BOOKING_KEY, DROPDOWN_MENU_ITEMS } from '../../shared/constants/navbar.constant';
import { Button, Dropdown, Link, Navbar as NavBarNextUI } from '@nextui-org/react';
import { Location, NavigateFunction, useNavigate } from 'react-router-dom';
import { LocationState } from '../../shared/models/ihm/navigation.model';
import { FunctionComponent, useState, Key, useEffect } from 'react';
import { Route } from '../../shared/constants/route.constant';
import { useLocation } from 'react-router-dom'
import './Navbar.css';
import { NavigationService } from '../../shared/services/ihm/navigation.service';

export const Navbar: FunctionComponent = () => {
    const location: Location = useLocation();
    const navigate: NavigateFunction = useNavigate();
    const [locationState, setLocationState] = useState<LocationState>({
        isPathNameDeskBooking: false,
        isPathNameUserBookingHistory: false
    });
    const [selectedDropdownMenuItem, setSelectedDropdownMenuItem] = useState<Set<Key>>(new Set(DESK_BOOKING_KEY));

    const goToBookingHistory = (e: React.MouseEvent<HTMLElement>): void => {
        e.preventDefault();
        clearSelectedDropdownMenuItem();
        navigate(Route.USER_BOOKING_HISTORY);
    };
    const goToDeskBookingForm = (): void => navigate(Route.DESK_BOOKING);
    const goToRoomBookingForm = (): void => navigate(Route.ROOM_BOOKING);

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

    useEffect(() => {
        const locationStateUpdated: LocationState = NavigationService.getLocationStatus(location.pathname);
        setLocationState(locationStateUpdated);
    }, [location.pathname])

    const onSelectDropdownMenuItem = (key: Key): void => {
        updateSelectedDropdownMenuItem(key);
        navigate(key as string);
    }

    return (
        <NavBarNextUI>
            <NavBarNextUI.Toggle showIn='xs' />
            <NavBarNextUI.Brand>
                Flexible Workspace
            </NavBarNextUI.Brand>
            <NavBarNextUI.Content hideIn='xs' variant={'highlight-solid'}>
                <Dropdown isBordered>
                    <NavBarNextUI.Item>
                        <Dropdown.Button
                            auto
                            light={!locationState.isPathNameDeskBooking}
                            css={{
                                px: 0,
                                dflex: 'center',
                                svg: { pe: 'none' }
                            }}
                            // iconRight={icons.chevron}
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
                                py: '$4',
                                // dropdown item left icon
                                svg: {
                                    color: '$secondary',
                                    mr: '$4',
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
                    isActive={locationState.isPathNameUserBookingHistory}
                    onClick={(e: React.MouseEvent<HTMLElement>) => goToBookingHistory(e)}
                    href=''>
                    Historique
                </NavBarNextUI.Link>
                <NavBarNextUI.Item css={{ ml: 20 }}>
                    <Button auto flat color={'gradient'} as={Link} href=''>
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
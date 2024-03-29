import { useMsal } from '@azure/msal-react';
import { Button } from '@nextui-org/react';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

export const SignOutButton: FunctionComponent = () => {
    const { instance } = useMsal();
    const handleLogout = (): void => { instance.logoutRedirect({ postLogoutRedirectUri: '/' }).catch(e => console.log(e)) };

    return (
        <Button color='secondary' auto as={Link} css={{ color: 'white', flex: 1 }} onClick={handleLogout}>
            Logout
        </Button>
    );
}
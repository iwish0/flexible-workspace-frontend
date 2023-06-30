import { Button } from '@nextui-org/react';
import { useMsal } from '@azure/msal-react';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

export const SignOutButton: FunctionComponent = () => {
    const { instance } = useMsal();
    const handleLogout = (): void => { instance.logoutRedirect({ postLogoutRedirectUri: '/' }).catch(e => console.log(e)) };

    return (
        <Button color={'gradient'} auto flat as={Link} css={{ color: 'white' }} onClick={handleLogout}>
            Logout
        </Button>
    );
}
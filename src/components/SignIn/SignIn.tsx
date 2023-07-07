import background from '../../assets/login-background.png';
import img from '../../assets/office-365-login.png';
import { loginRequest } from '../../authConfig';
import { useMsal } from '@azure/msal-react';
import { FunctionComponent } from 'react';
import './SignIn.css';

export const SignInButton: FunctionComponent = () => {
    const { instance } = useMsal();
    const handleLogin = (): void => { instance.loginRedirect(loginRequest).catch((e) => console.log(e)) };

    return (
        <>
            <div id='background' className='background'>
                <img src={background} alt='background' />
            </div>
            <div id='sign-in-block' className='signInBlock' >
                <span>PROXIAD GROUP</span>
                <span>Se connecter avec</span>
                <img src={img} alt='sign in button' onClick={handleLogin} />
            </div>
        </>
    );
}
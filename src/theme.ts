import { createTheme } from '@nextui-org/react';

export const theme = createTheme({
    type: 'light',  //it could be "light" or "dark"
    theme: {
        colors: {
            primary: '#18b3b3',
            secondary: '#dd1273',
            gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)'
        },
        space: {},
        fonts: {}
    }
})

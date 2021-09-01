import { cookieStorageManager, extendTheme, localStorageManager, ThemeConfig, ChakraProvider } from "@chakra-ui/react";
import type { NextApiRequest } from 'next';

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false
};

export const theme = extendTheme({ config });

interface IChakra {
    cookies: string | undefined;
    children: React.ReactNode;
};

export const Chakra: React.FC<IChakra> = ({cookies, children}) => {
    const colorModeManager = typeof cookies === "string" ?
        cookieStorageManager(cookies) :
        localStorageManager;
    
    return (
        <ChakraProvider theme={theme} resetCSS colorModeManager={colorModeManager}>
            {children}
        </ChakraProvider>
    );
}

export const getServerSideProps = ({req}: {req: NextApiRequest}) => {
    return {
        props: {
            cookies: req.headers.cookie ?? ""
        }
    };
};
import Stack from "@mui/material/Stack";
import type { History } from "@remix-run/router";
import { createBrowserHistory } from 'history';
import { FC, memo, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

import Typography from "@/components/Typography";
import { IS_DEV, VERSION } from "@/config";
import { NotificationContainer } from '@/root/NotificationContainer.tsx';
import store from '@/stores';
import Theme from '@/theme';

interface IRoot {
    children: ReactElement;
}

const ROUTE_BASELINE: string = '/';


const history = createBrowserHistory({
    window,
});

const BuildVersion = () => {

    if(!IS_DEV) {
        return;
    }
    return (
        <Stack
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
            }}
        >
            <Typography variant="caption1">v{VERSION}</Typography>
        </Stack>
    );
};


const Root: FC<IRoot> = ({ children }) => {
    return (
        <Provider store={store}>
            <HistoryRouter
                basename={ROUTE_BASELINE}
                history={history as unknown as History}
            >
                    <Theme>
                        <NotificationContainer/>
                        {children}
                        <BuildVersion/>
                </Theme>
            </HistoryRouter>
        </Provider>
    );
};

export default memo(Root);

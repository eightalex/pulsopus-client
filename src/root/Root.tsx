import type { History } from "@remix-run/router";
import { createBrowserHistory } from 'history';
import { FC, memo, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

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
                </Theme>
            </HistoryRouter>
        </Provider>
    );
};

export default memo(Root);

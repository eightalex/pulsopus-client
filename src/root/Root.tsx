import { createBrowserHistory } from 'history';
import { NotificationContainer } from '@/root/NotificationContainer.tsx';
import Theme from '@/theme';
import { FC, memo, ReactElement } from 'react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import type { History } from "@remix-run/router";
import { Provider } from 'react-redux';
import store from '@/stores';

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

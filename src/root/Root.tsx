import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import type { History } from "@remix-run/router";
import { createBrowserHistory } from 'history';
import { memo, useEffect } from 'react';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter, useRoutes } from 'react-router-dom';

import Typography from "@/components/Typography";
import { IS_DEV, VERSION } from "@/config";
import { useDispatch } from "@/hooks";
import { NotificationContainer } from '@/root/NotificationContainer.tsx';
import { routes } from "@/routes";
import store from '@/stores';
import { onAuthorize } from "@/stores/auth";
import Theme from '@/theme';

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

const App = () => {
  const element = useRoutes(routes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onAuthorize());
  }, [dispatch]);

  return (
    <Box
      sx={({ palette: { backgroundColorPrimary, typography } }) => ({
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: backgroundColorPrimary,
        color: typography.primary,
      })}
    >
      {element}
    </Box>
  );
};


const Root = () => {
    return (
        <Provider store={store}>
            <HistoryRouter
                basename={ROUTE_BASELINE}
                history={history as unknown as History}
            >
                    <Theme>
                        <NotificationContainer/>
                        <App/>
                        <BuildVersion/>
                </Theme>
            </HistoryRouter>
        </Provider>
    );
};

export default memo(Root);

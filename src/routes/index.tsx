import { lazy } from 'react';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';
import AuthModule from 'src/modules/Auth';

import { MainLayout } from '@/components/Layout';
import LazyLoader from '@/components/LazyLoader';
import {
  ABOUT_ROUTE,
  ABOUT_ROUTE_TITLE,
  METHODOLOGY_ROUTE, METHODOLOGY_ROUTE_TITLE,
  ROOT_ID,
  ROOT_ROUTE,
  USER_CASES_ROUTE, USER_CASES_ROUTE_TITLE
} from '@/constants/routes';
import { RouteHelmet } from "@/routes/RouteHelmet.tsx";

const HomePage = LazyLoader(
  lazy(() => import(/* webpackChunkName: 'home page' */ '../pages/HomePage'))
);

const AboutPage = LazyLoader(
  lazy(() => import(/* webpackChunkName: 'about page' */ '../pages/AboutPage'))
);

const MethodologyPage = LazyLoader(
  lazy(() => import(/* webpackChunkName: 'methodology page' */ '../pages/MethodologyPage'))
);

const UserCasesPage = LazyLoader(
  lazy(() => import(/* webpackChunkName: 'user cases page' */ '../pages/UserCasesPage'))
);

export const routes: RouteObject[] = [
  {
    id: ROOT_ID,
    path: ROOT_ROUTE,
    element: (
      <MainLayout>
        <AuthModule/>
        <Outlet/>
      </MainLayout>
    ),
    children: [
      {
        index: true,
        element: <RouteHelmet element={<HomePage/>}/>,
      },
      {
        path: ABOUT_ROUTE,
        element: <RouteHelmet
          title={ABOUT_ROUTE_TITLE}
          canonical={ABOUT_ROUTE}
          element={<AboutPage/>}
        />,
      },
      {
        path: METHODOLOGY_ROUTE,
        element: <RouteHelmet
          title={METHODOLOGY_ROUTE_TITLE}
          canonical={METHODOLOGY_ROUTE}
          element={<MethodologyPage/>}
        />,
      },
      {
        path: USER_CASES_ROUTE,
        element: <RouteHelmet
          title={USER_CASES_ROUTE_TITLE}
          canonical={USER_CASES_ROUTE}
          element={<UserCasesPage/>}
        />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={ROOT_ROUTE} replace/>
  }
];

import { lazy } from 'react';
import { MainLayout } from '@/components/Layout';
import LazyLoader from '@/components/LazyLoader';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';
import { ABOUT_ROUTE, METHODOLOGY_ROUTE, ROOT_ID, ROOT_ROUTE, USER_CASES_ROUTE } from '@/constants/routes';
import AuthModule from '@/modules/AuthModule';

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
				element: <HomePage/>,
			},
			{
				path: ABOUT_ROUTE,
				element: <AboutPage/>,
			},
			{
				path: METHODOLOGY_ROUTE,
				element: <MethodologyPage/>,
			},
			{
				path: USER_CASES_ROUTE,
				element: <UserCasesPage/>,
			},
		],
	},
	{
		path: '*',
		element: <Navigate to={ROOT_ROUTE} replace />
	}
];

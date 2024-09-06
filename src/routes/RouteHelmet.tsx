import { FC, ReactNode } from 'react';
import { Helmet } from 'react-helmet';

import { CLIENT_URL } from "@/config.ts";
import { DEFAULT_ROUTE_TITLE } from "@/constants/routes.ts";

interface IRouteHelmetProps {
  title?: string;
  canonical?: string;
  description?: string;
  element: ReactNode;
  children?: ReactNode;
}

const createCanonicalHref = (...routes: string[]) => {
  if(!routes.length || !routes.join('').length) return CLIENT_URL;
  return `${CLIENT_URL}/${routes.join('/')}`;
};

export const RouteHelmet: FC<IRouteHelmetProps> = (props) => {
  const {
    element,
    children,
    title = DEFAULT_ROUTE_TITLE,
    description = 'Pulsopus application',
    canonical = '',
  } = props;
  return (
    <>
      <Helmet>
        <meta charSet="utf-8"/>
        <title>{title}</title>
        <meta name="description" content={description}/>
        <link rel="canonical" href={createCanonicalHref(canonical)}/>
        {children}
      </Helmet>
      {element}
    </>
  );
};
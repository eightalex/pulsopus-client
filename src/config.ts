const { MODE, DEV } = import.meta.env;

export const IS_DEV: boolean = MODE === 'development' || DEV;
export const VERSION: string = process.env.npm_package_version || '0.0.0';
export const API_URL: string = process.env.API_URL || '';
export const APP_URL: string = process.env.APP_URL || '';


#API_URL=https://api.pulsopus.dev/api/v1
#APP_URL=https://app.pulsopus.dev
API_URL=http://localhost:8080/api/v1
APP_URL=http://localhost:5173

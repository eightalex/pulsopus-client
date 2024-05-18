const { MODE, DEV } = import.meta.env;

export const IS_DEV: boolean = MODE === 'development' || DEV;
export const VERSION: string = process.env.npm_package_version || '0.0.0';
export const API_URL: string = process.env.API_URL || '';
export const APP_URL: string = process.env.APP_URL || '';

console.log('process.env', process.env);
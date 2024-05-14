/* eslint-disable */
// @ts-expect-error
import Error from '@/assets/icons/error.svg?react';
import { createSvgIcon } from './utils/createSvgIcon';

export const ErrorIcon = createSvgIcon(Error, { viewBox: '0 0 40 40'});

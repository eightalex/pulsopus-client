/* eslint-disable */
// @ts-expect-error
import Checkmark from '@/assets/icons/checkmark.svg?react';
import { createSvgIcon } from './utils/createSvgIcon';

export const CheckmarkIcon = createSvgIcon(Checkmark, { viewBox: '0 0 40 40'});

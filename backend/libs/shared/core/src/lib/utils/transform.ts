import dayjs from 'dayjs';

import { DateFormat } from '../constants/date-format';

export function transformDate({ value }): string {
  return dayjs(value).format(DateFormat.ONLY_DATE);
}

export function transformNumber({ value }): number {
  return +value;
}

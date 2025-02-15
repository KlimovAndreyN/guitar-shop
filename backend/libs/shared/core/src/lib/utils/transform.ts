import dayjs from 'dayjs';

import { DateFormat } from '../constants/date-format';

export function transformDate({ value }: { value: string }): string {
  return dayjs(value).format(DateFormat.ONLY_DATE);
}

export function transformNumber({ value }: { value: string }): number {
  return +value;
}

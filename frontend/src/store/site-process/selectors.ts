import type { State } from '../../types/state';
import type { SortName } from '../../types/types';
import { StoreSlice } from '../../const';

export const getPage = ({ [StoreSlice.SiteProcess]: SITE_PROCESS }: State): number => SITE_PROCESS.page;
export const getSorting = ({ [StoreSlice.SiteProcess]: SITE_PROCESS }: State): SortName => SITE_PROCESS.sorting;

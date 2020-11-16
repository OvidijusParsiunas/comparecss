import { WORKSHOP_TOOLBAR_OPTIONS } from '../consts/workshopToolbarOptions';

export type ComponentOptions<T> = {
  [key in keyof T]:
    {
      buttonName: string,
      identifier: WORKSHOP_TOOLBAR_OPTIONS,
    }[];
}

import { WORKSHOP_TOOLBAR_OPTIONS } from '../consts/workshopToolbarOptions';
import { ComponentModes } from './componentModes';

export type ComponentOptions<T extends keyof ComponentModes> = {
  [key in T]:
    {
      buttonName: string,
      identifier: WORKSHOP_TOOLBAR_OPTIONS,
    }[];
}

import { WORKSHOP_TOOLBAR_OPTIONS } from '../consts/workshopToolbarOptions';
import { SubcomponentCssModes } from './subcomponentCssModes';

export type ComponentOptions<T extends keyof SubcomponentCssModes> = {
  [key in T]:
    {
      buttonName: string,
      identifier: WORKSHOP_TOOLBAR_OPTIONS,
    }[];
}

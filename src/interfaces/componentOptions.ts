import { WORKSHOP_TOOLBAR_OPTIONS } from '../consts/workshopToolbarOptions';
import { SubcomponentCssModes } from './subcomponentCssModes';

export interface SettingProperties {
  buttonName: string,
  identifier: WORKSHOP_TOOLBAR_OPTIONS,
}

export type SubcomponentOptions<T extends keyof SubcomponentCssModes> = {
  [key in T]: SettingProperties[];
}

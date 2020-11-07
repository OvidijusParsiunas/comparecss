import { WORKSHOP_TOOLBAR_OPTIONS } from '../consts/workshopToolbarOptions';
import { BUTTON_COMPONENT_MODES } from '../consts/buttonComponentModes.enum';

export type ComponentOptions = {
  [key in BUTTON_COMPONENT_MODES]?:
  {
    buttonName: string,
    identifier: WORKSHOP_TOOLBAR_OPTIONS,
  }[];
}

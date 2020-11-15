import { WORKSHOP_TOOLBAR_OPTIONS } from '../consts/workshopToolbarOptions';
import { COMPONENT_MODES } from '../consts/componentModes.enum';

export type ComponentOptions = {
  [key in COMPONENT_MODES]?:
    {
      buttonName: string,
      identifier: WORKSHOP_TOOLBAR_OPTIONS,
    }[];
}

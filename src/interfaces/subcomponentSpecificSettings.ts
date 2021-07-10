import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../consts/workshopToolbarOptionTypes.enum';
import { SubcomponentProperties, UpdateOtherCssProperties } from './workshopComponent';
import { SUBCOMPONENT_TYPES } from '../consts/subcomponentTypes.enum';

export type SubcomponentSpecificSettings = {
  [key in WORKSHOP_TOOLBAR_OPTION_TYPES]?: {
    [cssPropertyName: string]: {
      scale?: [number, number];
      updateOtherCssProperties?: UpdateOtherCssProperties[];
    }
  };
}

export interface InterconnectedSetting {
  updateOtherCssProperties: UpdateOtherCssProperties[];
  dependantChildrenTypes: Set<SUBCOMPONENT_TYPES>;
  updateOtherCssPropertiesObjGenerator: (subcomponentProperties: SubcomponentProperties) => UpdateOtherCssProperties;
}

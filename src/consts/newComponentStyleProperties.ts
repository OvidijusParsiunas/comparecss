import { OverwritePropertiesFunc } from '../interfaces/overwriteSubcomponentPropertiesFunc';
import { WorkshopComponentCss } from '../interfaces/workshopComponentCss';
import { CustomCss } from '../interfaces/workshopComponent';
import { COMPONENT_STYLES } from './componentStyles.enum';
import { COMPONENT_TYPES } from './componentTypes.enum';

interface TextProperties {
  style: COMPONENT_STYLES;
  func: OverwritePropertiesFunc;
}

export interface NewComponentStyleProperties {
  componentType?: COMPONENT_TYPES;
  baseName?: string;
  baseStyle?: COMPONENT_STYLES;
  baseCustomCssFunc?: () => CustomCss;
  baseInheritedCss?: WorkshopComponentCss;
  overwriteLayersProperties?: {
    layer?: OverwritePropertiesFunc,
    text?: TextProperties[],
    button?: OverwritePropertiesFunc[],
    avatar?: OverwritePropertiesFunc,
  }[];
}

import { OverwritePropertiesFunc } from '../interfaces/addNewSubcomponent';
import { WorkshopComponentCss } from '../interfaces/workshopComponentCss';
import { COMPONENT_STYLES } from './componentStyles.enum';
import { CustomCss } from '../interfaces/workshopComponent';

export interface NewComponentStyleProperties {
  baseName?: string;
  baseStyle?: COMPONENT_STYLES;
  baseCustomCssFunc?: () => CustomCss;
  baseInheritedCss?: WorkshopComponentCss;
  overwriteLayersProperties?: {
    layer?: OverwritePropertiesFunc,
    text?: OverwritePropertiesFunc[],
    button?: OverwritePropertiesFunc[],
    avatar?: OverwritePropertiesFunc,
  }[];
}

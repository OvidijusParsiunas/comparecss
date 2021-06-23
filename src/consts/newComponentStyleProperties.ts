import { OverwritePropertiesFunc } from '../interfaces/addNewSubcomponent';
import { WorkshopComponentCss } from '../interfaces/workshopComponentCss';
import { NEW_COMPONENT_STYLES } from './newComponentStyles.enum';
import { CustomCss } from '../interfaces/workshopComponent';

export interface NewComponentStyleProperties {
  baseName?: string;
  baseStyle?: NEW_COMPONENT_STYLES;
  baseCustomCssFunc?: () => CustomCss;
  baseInheritedCss?: WorkshopComponentCss;
  textStyle?: NEW_COMPONENT_STYLES;
  overwriteButtonTextProperties?: OverwritePropertiesFunc;
}

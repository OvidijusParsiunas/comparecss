import { OverwritePropertiesFunc } from '../interfaces/addNewSubcomponent';
import { NEW_COMPONENT_STYLES } from './newComponentStyles.enum';
import { CustomCss } from '../interfaces/workshopComponent';

export interface NewComponentStyleProperties {
  baseName?: string;
  baseStyle?: NEW_COMPONENT_STYLES;
  baseCustomCss?: CustomCss;
  textStyle?: NEW_COMPONENT_STYLES;
  overwriteButtonTextProperties?: OverwritePropertiesFunc;
}

import { ComponentStyleToGenerator } from '../../../../../../interfaces/componentStyleToGenerator'
import { NEW_COMPONENT_STYLES } from '../../../../../../consts/newComponentStyles.enum'
import { buttonLayer } from './generators/buttonLayer';
import { defaultLayer } from './generators/default';

export const layerStyleToGenerator: ComponentStyleToGenerator = {
  [NEW_COMPONENT_STYLES.DEFAULT]: defaultLayer,
  [NEW_COMPONENT_STYLES.BUTTON_LAYER]: buttonLayer,
};

import { ComponentStyleToGenerator } from '../../../../../../interfaces/componentStyleToGenerator'
import { NEW_COMPONENT_STYLES } from '../../../../../../consts/newComponentStyles.enum'
import { buttonLayer } from './properties/buttonLayer';
import { defaultLayer } from './properties/default';

export const layerStyleToGenerator: ComponentStyleToGenerator = {
  [NEW_COMPONENT_STYLES.DEFAULT]: defaultLayer,
  [NEW_COMPONENT_STYLES.BUTTON_LAYER]: buttonLayer,
};

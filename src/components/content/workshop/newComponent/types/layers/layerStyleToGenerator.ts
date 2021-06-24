import { ComponentStyleToGenerator } from '../../../../../../interfaces/componentStyleToGenerator'
import { DEFAULT_STYLE, LAYER_STYLES } from '../../../../../../consts/componentStyles.enum'
import { buttonLayer } from './generators/buttonLayer';
import { defaultLayer } from './generators/default';

export const layerStyleToGenerator: ComponentStyleToGenerator = {
  [DEFAULT_STYLE.DEFAULT]: defaultLayer,
  [LAYER_STYLES.BUTTON]: buttonLayer,
};

import { ComponentStyleToGenerator } from '../../../../../../interfaces/componentStyleToGenerator'
import { DEFAULT_STYLE, LAYER_STYLES } from '../../../../../../consts/componentStyles.enum'
import { plainLayer } from './generators/plainLayer';
import { defaultLayer } from './generators/default';
import { cardLayer } from './generators/cardLayer';

export const layerStyleToGenerator: ComponentStyleToGenerator = {
  [DEFAULT_STYLE.DEFAULT]: defaultLayer,
  [LAYER_STYLES.PLAIN]: plainLayer,
  [LAYER_STYLES.CARD]: cardLayer,
};

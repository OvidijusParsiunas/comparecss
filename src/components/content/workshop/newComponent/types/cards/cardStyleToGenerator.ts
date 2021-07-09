import { ComponentStyleToGenerator } from '../../../../../../interfaces/componentStyleToGenerator'
import { DEFAULT_STYLES } from '../../../../../../consts/componentStyles.enum'
import { defaultCard } from './generators/default';
import { cardBase } from './generators/base';

export const cardStyleToGenerator: ComponentStyleToGenerator = {
  [DEFAULT_STYLES.BASE]: cardBase,
  [DEFAULT_STYLES.DEFAULT]: defaultCard,
};

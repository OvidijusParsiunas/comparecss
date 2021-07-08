import { ComponentStyleToGenerator } from '../../../../../../interfaces/componentStyleToGenerator'
import { DEFAULT_STYLES } from '../../../../../../consts/componentStyles.enum'
import { cardBase } from './generators/cardBaseBuilder';
import { defaultCard } from './generators/default';  

export const cardStyleToGenerator: ComponentStyleToGenerator = {
  [DEFAULT_STYLES.DEFAULT]: defaultCard,
  [DEFAULT_STYLES.BASE]: cardBase,
};

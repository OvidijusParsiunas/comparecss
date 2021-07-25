import { ComponentStyleToGenerator } from '../../../../../../interfaces/componentStyleToGenerator'
import { DEFAULT_STYLES } from '../../../../../../consts/componentStyles.enum'
import { defaultImage } from './generators/default';
import { imageBase } from './generators/base';

export const imageStyleToGenerator: ComponentStyleToGenerator = {
  [DEFAULT_STYLES.BASE]: imageBase,
  [DEFAULT_STYLES.DEFAULT]: defaultImage,
};

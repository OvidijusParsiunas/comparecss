import { ComponentStyleToGenerator } from '../../../../../../interfaces/componentStyleToGenerator'
import { DEFAULT_STYLE } from '../../../../../../consts/componentStyles.enum'
import { avatar } from './generators/avatar';  

export const avatarStyleToGenerator: ComponentStyleToGenerator = {
  [DEFAULT_STYLE.DEFAULT]: avatar,
};

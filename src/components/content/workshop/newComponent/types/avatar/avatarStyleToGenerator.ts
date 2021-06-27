import { ComponentStyleToGenerator } from '../../../../../../interfaces/componentStyleToGenerator'
import { DEFAULT_STYLE } from '../../../../../../consts/componentStyles.enum'
import { defaultAvatar } from './generators/default';  

export const avatarStyleToGenerator: ComponentStyleToGenerator = {
  [DEFAULT_STYLE.DEFAULT]: defaultAvatar,
};

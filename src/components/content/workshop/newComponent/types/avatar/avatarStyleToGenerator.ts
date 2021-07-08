import { ComponentStyleToGenerator } from '../../../../../../interfaces/componentStyleToGenerator'
import { DEFAULT_STYLES } from '../../../../../../consts/componentStyles.enum'
import { defaultAvatar } from './generators/default';  

export const avatarStyleToGenerator: ComponentStyleToGenerator = {
  [DEFAULT_STYLES.DEFAULT]: defaultAvatar,
};

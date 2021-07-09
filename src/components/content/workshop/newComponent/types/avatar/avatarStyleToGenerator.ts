import { ComponentStyleToGenerator } from '../../../../../../interfaces/componentStyleToGenerator'
import { DEFAULT_STYLES } from '../../../../../../consts/componentStyles.enum'
import { defaultAvatar } from './generators/default';
import { avatarBase } from './generators/base';

export const avatarStyleToGenerator: ComponentStyleToGenerator = {
  [DEFAULT_STYLES.BASE]: avatarBase,
  [DEFAULT_STYLES.DEFAULT]: defaultAvatar,
};

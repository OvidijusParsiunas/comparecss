import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SubcomponentOptions } from '../../../../../../../interfaces/componentOptions';
import { buttonBaseOptions } from '../button/base';

type DropdownButtonOptionsModes = CSS_PSEUDO_CLASSES.DEFAULT | CSS_PSEUDO_CLASSES.HOVER | CSS_PSEUDO_CLASSES.CLICK;

export const dropdownButtonOptions: SubcomponentOptions<DropdownButtonOptionsModes> = {
  ...buttonBaseOptions,
};

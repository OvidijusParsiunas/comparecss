import { CSS_PSEUDO_CLASSES } from '../../../../../../consts/subcomponentCssClasses.enum';
import { CustomCss } from '../../../../../../interfaces/workshopComponent';

export class CustomCssUtils {

  public static createNewCustomCssObj(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {},
      [CSS_PSEUDO_CLASSES.HOVER]: {},
      [CSS_PSEUDO_CLASSES.CLICK]: {},
    };
  }
}

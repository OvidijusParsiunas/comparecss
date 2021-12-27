import { CSS_PSEUDO_CLASSES } from '../../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../../../interfaces/workshopComponentCss';
import { CustomCss } from '../../../../../../interfaces/workshopComponent';

export class CustomCssUtils {

  public static createNewCustomCssObj(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {},
      [CSS_PSEUDO_CLASSES.HOVER]: {},
      [CSS_PSEUDO_CLASSES.CLICK]: {},
    };
  }

  public static getComponentBorderBasedOnAlias(newRangeValue: string): WorkshopComponentCss {
    return {
      borderTopWidth: newRangeValue,
      borderRightWidth: newRangeValue,
      borderBottomWidth: newRangeValue,
    };
  }

  public static setComponentBorderBasedOnAlias(newRangeValue: string, workshopComponentCss: WorkshopComponentCss): void {
    workshopComponentCss.borderTopWidth = newRangeValue;
    workshopComponentCss.borderRightWidth = newRangeValue;
    workshopComponentCss.borderBottomWidth = newRangeValue;
  }
}

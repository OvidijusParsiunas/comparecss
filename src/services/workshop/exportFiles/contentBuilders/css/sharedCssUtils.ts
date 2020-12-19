import { WorkshopComponentCss } from '../../../../../interfaces/workshopComponentCss';
import { CustomCss } from '../../../../../interfaces/workshopComponent';
import { SharedInheritedCss } from './cssBuilder';
import CssBuilderUtils from './cssBuilderUtils';

export default class SharedCssUtils {

  public static buildSharedInheritedCss(sharedInheritedCss: SharedInheritedCss, numberOfNewLines: number): string {
    let resultCss = '';
    Object.keys(sharedInheritedCss).forEach((key) => {
      const classes = sharedInheritedCss[key].classes.join(', ');
      resultCss += `${classes} {\r\n${CssBuilderUtils.buildCssString(sharedInheritedCss[key].css)}\r\n}${'\r\n'.repeat(numberOfNewLines)}`;
    });
    return resultCss;
  }

  public static allocateSharedInheritedCss(customCss: CustomCss, inheritedCss: WorkshopComponentCss, isCssShared: boolean,
    sharedCssObj: SharedInheritedCss, sharedCssId: string, classCombinator: string): [CustomCss, WorkshopComponentCss?] {
    if (inheritedCss) {
      if (isCssShared) {
        if (!sharedCssObj.hasOwnProperty(sharedCssId)) {
          sharedCssObj[sharedCssId] = { classes: [`.${classCombinator}`], css: inheritedCss };
        } else {
          sharedCssObj[sharedCssId].classes.push(`.${classCombinator}`);
        }
      } else {
        return [customCss, inheritedCss];
      }
    }
    return [customCss];
  }
}

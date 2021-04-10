import { CustomCss, SubcomponentProperties, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { CustomCssWithInheritedCss, SharedInheritedCss } from '../../../../../interfaces/cssBuilder';
import { WorkshopComponentCss } from '../../../../../interfaces/workshopComponentCss';
import { NEW_COMPONENT_TYPES } from '../../../../../consts/newComponentTypes.enum';
import GeneralUtils from './generalUtils';

export default class SharedCssUtils {

  private static purgeUniqueSubcomponents = (subcomponent: unknown): void => { Object.keys(subcomponent).map((key) => { if (subcomponent[key] < 2) delete subcomponent[key] })};

  // this is required as components can share subcomponent types: e.g. BASE
  public static generateComponentToSubcomponentId = (componentType: NEW_COMPONENT_TYPES, subcomponentType: string): string => componentType + subcomponentType;

  public static identifyRepeatedSubcomponents(components: WorkshopComponent[]): unknown {
    const repeatedSubcomponents = {};
    components.forEach((component) => {
      const { subcomponents, type } = component;
      Object.keys(subcomponents).forEach((subcomponentNames: string) => {
        const subcomponent: SubcomponentProperties = subcomponents[subcomponentNames];
        if (subcomponent.subcomponentDisplayStatus && !subcomponent.subcomponentDisplayStatus.isDisplayed) return;
        const componentToSubcomponentId = this.generateComponentToSubcomponentId(type, subcomponentNames);
        repeatedSubcomponents[componentToSubcomponentId] = repeatedSubcomponents[componentToSubcomponentId] ? repeatedSubcomponents[componentToSubcomponentId] + 1 : 1;
      });
    });
    this.purgeUniqueSubcomponents(repeatedSubcomponents);
    return repeatedSubcomponents;
  }
  
  public static buildSharedInheritedCss(sharedInheritedCss: SharedInheritedCss, numberOfNewLines: number): string {
    let resultCss = '';
    Object.keys(sharedInheritedCss).forEach((key) => {
      const classes = sharedInheritedCss[key].classes.join(', ');
      resultCss += `${classes} {\r\n${GeneralUtils.buildCssString(sharedInheritedCss[key].css)}\r\n}${'\r\n'.repeat(numberOfNewLines)}`;
    });
    return resultCss;
  }

  // this method is used to either create a tuple with custom and inherited css if there is only one component with that particular type (sharedCssId) or
  // add the inherited css to the sharedCssObj which will be processed at the end and return customCss only
  public static allocateSharedInheritedCss(customCss: CustomCss, inheritedCss: WorkshopComponentCss, isCssShared: boolean,
    sharedCssObj: SharedInheritedCss, sharedCssId: string, classCombinator: string): CustomCssWithInheritedCss {
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

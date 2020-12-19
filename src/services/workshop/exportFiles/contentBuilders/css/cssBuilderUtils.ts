import { NEW_COMPONENT_TYPES } from "@/consts/newComponentTypes.enum";
import { SUB_COMPONENTS } from "@/consts/subcomponentModes.enum";
import { SubcomponentProperties, WorkshopComponent } from "@/interfaces/workshopComponent";
import { WorkshopComponentCss } from "@/interfaces/workshopComponentCss";

export default class CssBuilderUtils {

  private static purgeUniqueSubcomponents = (subcomponent: unknown): void => { Object.keys(subcomponent).map((key) => { if (subcomponent[key] < 2) delete subcomponent[key] })};

  private static camelToKebabCase(propertyString: string): string {
    return propertyString.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();
  }

  public static generateComponentToSubcomponentId = (componentType: NEW_COMPONENT_TYPES, subcomponentType: SUB_COMPONENTS): string => componentType + subcomponentType;

  public static buildCssString(cssModeProperties: WorkshopComponentCss): string {
    return Object.keys(cssModeProperties).map((key) => `  ${this.camelToKebabCase(key)}: ${cssModeProperties[key]};`).join('\r\n');
  }

  public static identifyRepeatedSubcomponents(components: WorkshopComponent[]): unknown {
    const repeatedSubcomponents = {};
    components.forEach((component) => {
      const { subcomponents, type } = component;
      Object.keys(subcomponents).forEach((key: SUB_COMPONENTS) => {
        const subcomponent: SubcomponentProperties = subcomponents[key];
        if (subcomponent.optionalSubcomponent && !subcomponent.optionalSubcomponent.currentlyDisplaying) return;
        const componentToSubcomponentId = this.generateComponentToSubcomponentId(type, key);
        repeatedSubcomponents[componentToSubcomponentId] = repeatedSubcomponents[componentToSubcomponentId] ? repeatedSubcomponents[componentToSubcomponentId] + 1 : 1;
      });
    });
    this.purgeUniqueSubcomponents(repeatedSubcomponents);
    return repeatedSubcomponents;
  }
}

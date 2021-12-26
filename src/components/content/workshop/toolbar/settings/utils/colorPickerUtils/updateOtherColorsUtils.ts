import { UpdateOtherCssProperties } from '../../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';

export class UpdateOtherColorsUtils {

  public static updateOtherCssProperties(updateOtherCssProperties: UpdateOtherCssProperties[],
      activeCssPseudoClassesDropdownItem: CSS_PSEUDO_CLASSES, hexColor: string): void {
    updateOtherCssProperties?.forEach((otherCssProperties) => {
      const { baseSubcomponent, cssProperty } = otherCssProperties;
      (baseSubcomponent.customCss[activeCssPseudoClassesDropdownItem] as any)[cssProperty] = hexColor;
    });
  }
}

import { UpdateOtherCssProperties } from '../../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';

// Functionality here is currently being used for Range values, but it can be reutilized for other settings and their properties
export class UpdateOtherColorsUtils {

  public static updateOtherCssProperties(updateOtherCssProperties: UpdateOtherCssProperties[], activeCssPseudoClass: CSS_PSEUDO_CLASSES, hexColor: string): void {
    updateOtherCssProperties.forEach((otherCssProperties) => {
      const { customCss, cssProperty } = otherCssProperties;
      (customCss[activeCssPseudoClass] as any)[cssProperty] = hexColor;
    });
  }
}

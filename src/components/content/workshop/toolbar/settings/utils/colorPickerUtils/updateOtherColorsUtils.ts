import { UpdateOtherCssProperties } from '../../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';

export class UpdateOtherColorsUtils {

  public static updateOtherCssProperties(updateOtherCssProperties: UpdateOtherCssProperties[],
      activeCssPseudoClass: CSS_PSEUDO_CLASSES, hexColor: string): void {
    updateOtherCssProperties?.forEach((otherCssProperties) => {
      const { customCss, cssProperty } = otherCssProperties;
      (customCss[activeCssPseudoClass] as any)[cssProperty] = hexColor;
    });
  }
}

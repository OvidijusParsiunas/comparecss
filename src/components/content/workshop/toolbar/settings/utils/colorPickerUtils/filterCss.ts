import { WorkshopComponentCss } from '../../../../../../../interfaces/workshopComponentCss';
import { Subcomponent } from '../../../../../../../interfaces/workshopComponent';
import { ICON_TYPES } from '../../../../../../../consts/iconTypes.enum';
import { FilterCssGenerator } from './filterCssGenerator';

export class FilterCss {
  
  public static set(hexColor: string, subcomponent: Subcomponent): void {
    const { customCss, activeCssPseudoClassesDropdownItem, customStaticFeatures } = subcomponent;
    if (customStaticFeatures.icon.type === ICON_TYPES.CUSTOM) {
      const filterColor = FilterCssGenerator.generate(hexColor);
      customCss[activeCssPseudoClassesDropdownItem].filter = filterColor;
    }
  }

  public static shouldReset(cssProperty: keyof WorkshopComponentCss, subcomponent: Subcomponent): boolean {
    return cssProperty === 'color' && subcomponent.customStaticFeatures.icon.type === ICON_TYPES.CUSTOM;
  }
}

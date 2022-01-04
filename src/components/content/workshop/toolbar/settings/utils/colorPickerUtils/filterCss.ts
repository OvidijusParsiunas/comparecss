import { WorkshopComponentCss } from '../../../../../../../interfaces/workshopComponentCss';
import { Subcomponent } from '../../../../../../../interfaces/workshopComponent';
import { ICON_TYPES } from '../../../../../../../consts/iconTypes.enum';
import { compute } from './filterCssGenerator';

export class FilterCss {
  
  public static set(hexColor: string, subcomponent: Subcomponent): void {
    const { customCss, activeCssPseudoClassesDropdownItem, customStaticFeatures } = subcomponent;
    if (customStaticFeatures.icon.type === ICON_TYPES.CUSTOM) {
      const filter = compute(hexColor);
      customCss[activeCssPseudoClassesDropdownItem].filter = filter;
    }
  }

  public static shouldReset(cssProperty: keyof WorkshopComponentCss, subcomponent: Subcomponent): boolean {
    return cssProperty === 'color' && subcomponent.customStaticFeatures.icon.type === ICON_TYPES.CUSTOM;
  }
}

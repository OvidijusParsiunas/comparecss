import { UseBaseComponentGeneric } from '../../../../../interfaces/useBasicComponentGeneric';
import { CustomCss, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../../interfaces/workshopComponentCss';
import { SUBCOMPONENT_TYPES } from '../../../../../consts/subcomponentTypes.enum';
import ComponentPreviewUtils from '../utils/componentPreviewUtils';

export default function useBaseComponentGeneric(): UseBaseComponentGeneric {

  function getSelectedDropdownCss(component: WorkshopComponent, subcomponentCss: CustomCss): WorkshopComponentCss {
    const { parentBaseComponentRef, customStaticFeatures } = component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    const { selectDropdown } = parentBaseComponentRef?.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customStaticFeatures || {};
    if (selectDropdown?.enabled && selectDropdown.lastSelectedItemText && selectDropdown.lastHoveredItemText === customStaticFeatures?.subcomponentText?.text) {
      return subcomponentCss[CSS_PSEUDO_CLASSES.HOVER];
    }
    return {};
  }

  const getStyleProperties = (component: WorkshopComponent): WorkshopComponentCss[] => {
    const { overwrittenCustomCssObj, customCss, inheritedCss, activeCssPseudoClass, customStaticFeatures } = component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    const subcomponentCss = overwrittenCustomCssObj || customCss;
    const selectedDropdownCss = getSelectedDropdownCss(component, subcomponentCss);
    return [
      inheritedCss || {},
      subcomponentCss[CSS_PSEUDO_CLASSES.DEFAULT],
      subcomponentCss[activeCssPseudoClass],
      { backgroundImage: customStaticFeatures?.image?.data ? 'url(' + customStaticFeatures.image.data + ')' : ''},
      { backgroundColor: ComponentPreviewUtils.getInheritedCustomCssValue(activeCssPseudoClass, subcomponentCss, 'backgroundColor') },
      { color: ComponentPreviewUtils.getInheritedCustomCssValue(activeCssPseudoClass, subcomponentCss, 'color') },
      selectedDropdownCss,
    ];
  };

  const getSubcomponentText = (component: WorkshopComponent): string => {
    const { selectDropdown, subcomponentText } = component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customStaticFeatures || {};
    // checks if this is a text subcomponent, if it has a selectDropdown reference (dropdown item texts subcomponents do not) and whether it is enabled
    if (subcomponentText?.text && selectDropdown?.enabled) {
      return selectDropdown.lastSelectedItemText || selectDropdown.defaultText;
    }
    return subcomponentText?.text || '';
  }

  return {
    getStyleProperties,
    getSubcomponentText,
  };
}

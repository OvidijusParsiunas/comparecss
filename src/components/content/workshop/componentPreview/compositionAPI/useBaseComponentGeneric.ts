import { UseBaseComponentGeneric } from '../../../../../interfaces/useBasicComponentGeneric';
import { CustomCss, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../../interfaces/workshopComponentCss';
import ComponentPreviewUtils from '../utils/componentPreviewUtils';

export default function useBaseComponentGeneric(): UseBaseComponentGeneric {

  function getSelectedDropdownCss(component: WorkshopComponent, subcomponentCss: CustomCss): WorkshopComponentCss {
    // go to parent auxiliary component and check selectDropdown properties
    const { parentAuxiliaryComponent, customStaticFeatures } = component.componentPreviewStructure.baseSubcomponentProperties;
    const { selectDropdown } = parentAuxiliaryComponent?.componentPreviewStructure.baseSubcomponentProperties.customStaticFeatures || {};
    if (selectDropdown?.enabled && selectDropdown.lastSelectedItemText && selectDropdown.lastHoveredItemText === customStaticFeatures?.subcomponentText?.text) {
      return subcomponentCss[CSS_PSEUDO_CLASSES.HOVER];
    }
    return {};
  }

  const getStyleProperties = (component: WorkshopComponent): WorkshopComponentCss[] => {
    const { baseSubcomponentProperties: {
      overwrittenCustomCssObj, customCss, inheritedCss, activeCssPseudoClass, customStaticFeatures} } = component.componentPreviewStructure;
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
    const { selectDropdown, subcomponentText } = (component as WorkshopComponent).componentPreviewStructure.baseSubcomponentProperties.customStaticFeatures || {};
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

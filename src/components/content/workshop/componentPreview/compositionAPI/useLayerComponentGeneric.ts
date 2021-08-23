import { UseLayerComponentGeneric } from '../../../../../interfaces/useLayerComponentGeneric';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../../interfaces/workshopComponentCss';
import { CSS_PROPERTY_VALUES } from '../../../../../consts/cssPropertyValues.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../consts/subcomponentTypes.enum';
import { Layer } from '../../../../../interfaces/componentPreviewStructure';
import { CustomCss } from '../../../../../interfaces/workshopComponent';
import ComponentPreviewUtils from '../utils/componentPreviewUtils';

export default function useLayerComponentGeneric(): UseLayerComponentGeneric {

  function getSelectedDropdownCss(layer: Layer, subcomponentCss: CustomCss): WorkshopComponentCss {
    const { parentComponent, nestedComponentsLockedToLayer } = layer.subcomponentProperties.seedComponent.ref;
    const { selectDropdown } = parentComponent?.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customStaticFeatures || {};
    if (selectDropdown?.enabled) {
      const itemTextSubcomponent = nestedComponentsLockedToLayer.list[0];
      if (selectDropdown.lastSelectedItemText && itemTextSubcomponent.customStaticFeatures.subcomponentText.text === selectDropdown.lastHoveredItemText) {
        return subcomponentCss[CSS_PSEUDO_CLASSES.HOVER];
      }
    }
    return {};
  }

  const getStyleProperties = (layer: Layer, isLastLayer: boolean): WorkshopComponentCss[] => {
    const { subcomponentProperties: { overwrittenCustomCssObj, customCss, customStaticFeatures, activeCssPseudoClass } } = layer;
    const subcomponentCss = overwrittenCustomCssObj || customCss;
    const selectedDropdownCss = getSelectedDropdownCss(layer, subcomponentCss);
    return [
      subcomponentCss[CSS_PSEUDO_CLASSES.DEFAULT],
      subcomponentCss[activeCssPseudoClass],
      { backgroundImage: customStaticFeatures?.image?.data ? 'url(' + customStaticFeatures.image.data + ')' : '' },
      { backgroundColor: ComponentPreviewUtils.getInheritedCustomCssValue(activeCssPseudoClass, subcomponentCss, 'backgroundColor') },
      { boxShadow: CSS_PROPERTY_VALUES.UNSET },
      isLastLayer ? { borderBottomWidth: '0px' } : {}, // can alternatively use nth class
      selectedDropdownCss,
    ];
  };

  return {
    getStyleProperties,
  };
}

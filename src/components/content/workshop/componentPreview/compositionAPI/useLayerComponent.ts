import { CompositionAPISubcomponentTriggerState } from '../../../../../interfaces/compositionAPISubcomponentTriggerState';
import { SubcomponentTriggers } from '../../utils/componentManipulation/utils/subcomponentTriggers';
import { CustomCss, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../../interfaces/workshopComponentCss';
import { CSS_PROPERTY_VALUES } from '../../../../../consts/cssPropertyValues.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../consts/subcomponentTypes.enum';
import { UseLayerComponent } from '../../../../../interfaces/useLayerComponent';
import { COMPONENT_TYPES } from '../../../../../consts/componentTypes.enum';
import { Layer } from '../../../../../interfaces/componentPreviewStructure';
import ComponentPreviewUtils from '../utils/componentPreviewUtils';

export default function useLayerComponent(): UseLayerComponent {

  const otherSubcomponentTriggerState: CompositionAPISubcomponentTriggerState = { subcomponentProperties: null };

  // part of a fix to make sure that the ripples are rendered on the layers and not on the bases of button components as
  // the overflow: hidden property on the base does not prevent the ripples from leaving the button when the base is clicked
  function getButtonPadding(containerComponent: WorkshopComponent): WorkshopComponentCss {
    if (containerComponent && (containerComponent.type === COMPONENT_TYPES.BUTTON || containerComponent.type === COMPONENT_TYPES.DROPDOWN)) {
      const { paddingLeft, paddingRight } = containerComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customCss[CSS_PSEUDO_CLASSES.DEFAULT];
      return { paddingLeft, paddingRight };
    }
    return {};
  }

  function getSelectedDropdownCss(layer: Layer, subcomponentCss: CustomCss): WorkshopComponentCss {
    const { containerComponent, childComponentsLockedToLayer } = layer.subcomponentProperties.seedComponent;
    if (containerComponent?.type !== COMPONENT_TYPES.DROPDOWN_MENU) return {};
    const { selectDropdown } = containerComponent.linkedComponents.base.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customStaticFeatures || {};
    if (selectDropdown?.enabled) {
      const itemTextSubcomponent = childComponentsLockedToLayer.list[0];
      if (selectDropdown.lastSelectedItemText && itemTextSubcomponent.customStaticFeatures.subcomponentText.text === selectDropdown.lastHoveredItemText) {
        return subcomponentCss[CSS_PSEUDO_CLASSES.HOVER];
      }
    }
    return {};
  }

  const generateStyleProperties = (layer: Layer, isLastLayer: boolean): WorkshopComponentCss[] => {
    const { subcomponentProperties: { overwrittenCustomCssObj, customCss, customStaticFeatures, activeCssPseudoClass } } = layer;
    SubcomponentTriggers.triggerOtherSubcomponentsCss(layer.subcomponentProperties, activeCssPseudoClass, otherSubcomponentTriggerState);
    const subcomponentCss = overwrittenCustomCssObj || customCss;
    const selectedDropdownCss = getSelectedDropdownCss(layer, subcomponentCss);
    const buttonPaddingCss = getButtonPadding(layer.subcomponentProperties.seedComponent.containerComponent);
    return [
      subcomponentCss[CSS_PSEUDO_CLASSES.DEFAULT],
      subcomponentCss[activeCssPseudoClass],
      { backgroundImage: customStaticFeatures?.image?.data ? 'url(' + customStaticFeatures.image.data + ')' : '' },
      { backgroundColor: ComponentPreviewUtils.getInheritedCustomCssValue(activeCssPseudoClass, subcomponentCss, 'backgroundColor') },
      { boxShadow: CSS_PROPERTY_VALUES.UNSET },
      isLastLayer ? { borderBottomWidth: '0px' } : {}, // can alternatively use nth class
      selectedDropdownCss,
      buttonPaddingCss,
    ];
  };

  return {
    generateStyleProperties,
  };
}
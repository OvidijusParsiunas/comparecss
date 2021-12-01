import { CompositionAPISubcomponentTriggerState } from '../../../../../interfaces/compositionAPISubcomponentTriggerState';
import { SelectDropdownUtils } from '../../newComponent/types/dropdowns/selectDropdown/selectDropdownUtils';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../consts/subcomponentOverlayClasses.enum';
import { SubcomponentTriggers } from '../../utils/componentManipulation/utils/subcomponentTriggers';
import { CustomCss, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../../interfaces/workshopComponentCss';
import { CSS_PROPERTY_VALUES } from '../../../../../consts/cssPropertyValues.enum';
import { UseLayerComponent } from '../../../../../interfaces/useLayerComponent';
import { COMPONENT_TYPES } from '../../../../../consts/componentTypes.enum';
import { Layer } from '../../../../../interfaces/componentPreviewStructure';
import ComponentPreviewUtils from '../utils/componentPreviewUtils';
import { Ref } from 'vue';

export default function useLayerComponent(layers: Ref<Layer[]>): UseLayerComponent {

  const otherSubcomponentTriggerState: CompositionAPISubcomponentTriggerState = { subcomponent: null };

  // part of a fix to make sure that the ripples are rendered on the layers and not on the bases of button components as
  // the overflow: hidden property on the base does not prevent the ripples from leaving the button when the base is clicked
  function getButtonPadding(containerComponent: WorkshopComponent): WorkshopComponentCss {
    if (containerComponent && (containerComponent.type === COMPONENT_TYPES.BUTTON || containerComponent.type === COMPONENT_TYPES.DROPDOWN)) {
      const { paddingLeft, paddingRight } = containerComponent.baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT];
      return { paddingLeft, paddingRight };
    }
    return {};
  }

  function getSelectedDropdownMenuItemCss(layer: Layer, subcomponentCss: CustomCss): WorkshopComponentCss {
    return SelectDropdownUtils.isItemSelected(layer) ? subcomponentCss[CSS_PSEUDO_CLASSES.HOVER] : {};
  }

  const getComponentStyleProperties = (layer: Layer, isLastLayer: boolean): WorkshopComponentCss[] => {
    const { subcomponent: { overwrittenCustomCssObj, customCss, customStaticFeatures, activeCssPseudoClassesDropdownItem } } = layer;
    SubcomponentTriggers.triggerOtherSubcomponentsCss(layer.subcomponent, activeCssPseudoClassesDropdownItem, otherSubcomponentTriggerState);
    const subcomponentCss = overwrittenCustomCssObj || customCss;
    const selectedDropdownMenuItemCss = getSelectedDropdownMenuItemCss(layer, subcomponentCss);
    const buttonPaddingCss = getButtonPadding(layer.subcomponent.seedComponent.containerComponent);
    return [
      subcomponentCss[CSS_PSEUDO_CLASSES.DEFAULT],
      subcomponentCss[activeCssPseudoClassesDropdownItem],
      { backgroundImage: customStaticFeatures?.image?.data ? 'url(' + customStaticFeatures.image.data + ')' : '' },
      { backgroundColor: ComponentPreviewUtils.getInheritedCustomCssValue(activeCssPseudoClassesDropdownItem, subcomponentCss, 'backgroundColor') },
      { boxShadow: CSS_PROPERTY_VALUES.UNSET },
      isLastLayer ? { borderBottomWidth: '0px' } : {}, // can alternatively use nth class
      selectedDropdownMenuItemCss,
      buttonPaddingCss,
    ];
  };

  const getOverlayStyleProperties = (layer: Layer, currentIndex: number): WorkshopComponentCss => {
    const subcomponentCss = { ...layer.subcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT] };
    subcomponentCss.zIndex = layers.value.length - currentIndex + 1;
    if (layer.subcomponent.isTemporaryAddPreview) subcomponentCss.display = 'block';
    return subcomponentCss;
  }

  
  const getLayerCssClasses = (layer: Layer): string[] => {
    const classes = [SUBCOMPONENT_OVERLAY_CLASSES.BASE, SUBCOMPONENT_OVERLAY_CLASSES.DEFAULT];
    if (layer.subcomponent.isTemporaryAddPreview) {
      classes.push(SUBCOMPONENT_OVERLAY_CLASSES.SUBCOMPONENT_TOGGLE_ADD);
    }
    return classes;
  }

  return {
    getLayerCssClasses,
    getOverlayStyleProperties,
    getComponentStyleProperties,
  };
}

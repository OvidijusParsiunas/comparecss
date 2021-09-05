import { CompositionAPISubcomponentTriggerState } from '../../../../../interfaces/compositionAPISubcomponentTriggerState';
import { SubcomponentTriggers } from '../../utils/componentManipulation/utils/subcomponentTriggers';
import { CustomCss, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../../interfaces/workshopComponentCss';
import { SUBCOMPONENT_TYPES } from '../../../../../consts/subcomponentTypes.enum';
import { UseBaseComponent } from '../../../../../interfaces/useBaseComponent';
import { COMPONENT_TYPES } from '../../../../../consts/componentTypes.enum';
import ComponentPreviewUtils from '../utils/componentPreviewUtils';

export default function useBaseComponent(): UseBaseComponent {

  const otherSubcomponentTriggerState: CompositionAPISubcomponentTriggerState = { subcomponentProperties: null };

  const isIcon = (component: WorkshopComponent): boolean => {
    return component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].subcomponentType === SUBCOMPONENT_TYPES.ICON;
  };

  // part of a fix to make sure that the ripples are rendered on the layers and not on the bases of button components as
  // the overflow: hidden property on the base does not prevent the ripples from leaving the button when the base is clicked
  function substituteButtonPaddingToWidth(component: WorkshopComponent, subcomponentCss: CustomCss): WorkshopComponentCss {
    const buttonPaddingSubstitutedToWidth: WorkshopComponentCss = {};
    if (component.type === COMPONENT_TYPES.BUTTON || component.type === COMPONENT_TYPES.DROPDOWN) {
      const { paddingLeft, paddingRight, width } = subcomponentCss[CSS_PSEUDO_CLASSES.DEFAULT];
      const newWidth = `${Number.parseFloat(paddingLeft) + Number.parseFloat(width) + Number.parseFloat(paddingRight)}px`;
      buttonPaddingSubstitutedToWidth.paddingLeft = '0px';
      buttonPaddingSubstitutedToWidth.paddingRight = '0px';
      buttonPaddingSubstitutedToWidth.width = newWidth;
    }
    return buttonPaddingSubstitutedToWidth;
  }

  function getSelectedDropdownCss(component: WorkshopComponent, subcomponentCss: CustomCss): WorkshopComponentCss {
    if (component.type === COMPONENT_TYPES.TEXT && component.containerComponent.type === COMPONENT_TYPES.DROPDOWN_MENU) {
      const { selectDropdown } = component.masterComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customStaticFeatures;
      if (selectDropdown?.enabled && selectDropdown.lastSelectedItemText
          && selectDropdown.lastHoveredItemText === component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customStaticFeatures.subcomponentText?.text) {
        return subcomponentCss[CSS_PSEUDO_CLASSES.HOVER];
      }
    }
    return {};
  }

  const generateStyleProperties = (component: WorkshopComponent): WorkshopComponentCss[] => {
    const { overwrittenCustomCssObj, customCss, inheritedCss, activeCssPseudoClass, customStaticFeatures } = component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    const subcomponentCss = overwrittenCustomCssObj || customCss;
    SubcomponentTriggers.triggerOtherSubcomponentsCss(component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE], activeCssPseudoClass, otherSubcomponentTriggerState);
    const selectedDropdownCss = getSelectedDropdownCss(component, subcomponentCss);
    const buttonPaddingSubstitutedToWidth = substituteButtonPaddingToWidth(component, subcomponentCss);
    return [
      inheritedCss || {},
      subcomponentCss[CSS_PSEUDO_CLASSES.DEFAULT],
      subcomponentCss[activeCssPseudoClass],
      { backgroundImage: customStaticFeatures?.image?.data ? 'url(' + customStaticFeatures.image.data + ')' : ''},
      { backgroundColor: ComponentPreviewUtils.getInheritedCustomCssValue(activeCssPseudoClass, subcomponentCss, 'backgroundColor') },
      { color: ComponentPreviewUtils.getInheritedCustomCssValue(activeCssPseudoClass, subcomponentCss, 'color') },
      isIcon(component) ? { pointerEvents: 'none' } : {},
      buttonPaddingSubstitutedToWidth,
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
    isIcon,
    generateStyleProperties,
    getSubcomponentText,
  };
}

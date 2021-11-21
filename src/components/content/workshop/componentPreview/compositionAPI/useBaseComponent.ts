import { DisplayInFrontOfSiblings } from '../../utils/componentManipulation/displayInFrontOfSiblings/displayInFrontOfSiblingsUtils';
import { ButtonGroupCompositionAPIUtils } from '../../newComponent/types/buttonGroups/utils/buttonGroupCompositionAPIUtils';
import { CompositionAPISubcomponentTriggerState } from '../../../../../interfaces/compositionAPISubcomponentTriggerState';
import { SelectDropdownUtils } from '../../newComponent/types/dropdowns/selectDropdown/selectDropdownUtils';
import { CustomCss, CustomFeatures, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { SubcomponentTriggers } from '../../utils/componentManipulation/utils/subcomponentTriggers';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../../interfaces/workshopComponentCss';
import { SUBCOMPONENT_TYPES } from '../../../../../consts/subcomponentTypes.enum';
import { JAVASCRIPT_CLASSES } from '../../../../../consts/javascriptClasses.enum';
import { UseBaseComponent } from '../../../../../interfaces/useBaseComponent';
import { COMPONENT_TYPES } from '../../../../../consts/componentTypes.enum';
import ComponentPreviewUtils from '../utils/componentPreviewUtils';

export default function useBaseComponent(): UseBaseComponent {

  const otherSubcomponentTriggerState: CompositionAPISubcomponentTriggerState = { subcomponent: null };

  const isIcon = (component: WorkshopComponent): boolean => {
    return component.baseSubcomponent.subcomponentType === SUBCOMPONENT_TYPES.ICON;
  };

  function getBaseContainerCss(component: WorkshopComponent): WorkshopComponentCss {
    const { baseSubcomponent } = component;
    const { top } = baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT];
    const baseContainerCss: WorkshopComponentCss = { top: top || '50%' };
    DisplayInFrontOfSiblings.setZIndexOnComponentCss(baseSubcomponent, baseContainerCss);
    return baseContainerCss;
  }

  function getInheritedValues(activeCssPseudoClass: CSS_PSEUDO_CLASSES, subcomponentCss: CustomCss): WorkshopComponentCss {
    return {
      backgroundColor: ComponentPreviewUtils.getInheritedCustomCssValue(activeCssPseudoClass, subcomponentCss, 'backgroundColor'),
      color: ComponentPreviewUtils.getInheritedCustomCssValue(activeCssPseudoClass, subcomponentCss, 'color'),
      borderColor: ComponentPreviewUtils.getInheritedCustomCssValue(activeCssPseudoClass, subcomponentCss, 'borderColor'),
      boxShadow: ComponentPreviewUtils.getInheritedCustomCssValue(activeCssPseudoClass, subcomponentCss, 'boxShadow'),
    };
  }

  function getOverflowHiddenCss(customFeatures: CustomFeatures): WorkshopComponentCss {
    if (customFeatures?.jsClasses?.has(JAVASCRIPT_CLASSES.RIPPLES)) {
      return { overflow: 'hidden' };
    }
    return {};
  }

  // part of a fix to make sure that the ripples are rendered on the layers and not on the bases of button components as
  // the overflow: hidden property on the base does not prevent the ripples from leaving the button when the base is clicked
  function substituteButtonPaddingToWidthCss(component: WorkshopComponent, subcomponentCss: CustomCss): WorkshopComponentCss {
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

  function getButtonGroupButtonOverwrittenCss(component: WorkshopComponent): WorkshopComponentCss {
    return component.containerComponent?.type === COMPONENT_TYPES.BUTTON_GROUP
      ? ButtonGroupCompositionAPIUtils.getButtonGroupCss(component) : {};
  }

  function getSelectedDropdownMenuTextCss(component: WorkshopComponent, subcomponentCss: CustomCss): WorkshopComponentCss {
    return SelectDropdownUtils.isTextSelected(component) ? subcomponentCss[CSS_PSEUDO_CLASSES.HOVER] : {};
  }

  const getStyleProperties = (component: WorkshopComponent): WorkshopComponentCss[] => {
    const { overwrittenCustomCssObj, customCss, customFeatures, inheritedCss, activeCssPseudoClass, customStaticFeatures } = component.baseSubcomponent;
    const subcomponentCss = overwrittenCustomCssObj || customCss;
    SubcomponentTriggers.triggerOtherSubcomponentsCss(component.baseSubcomponent, activeCssPseudoClass, otherSubcomponentTriggerState);
    const buttonPaddingSubstitutedToWidthCss = substituteButtonPaddingToWidthCss(component, subcomponentCss);
    const selectedDropdownMenuTextCss = getSelectedDropdownMenuTextCss(component, subcomponentCss);
    const buttonGroupOverwrittenCss = getButtonGroupButtonOverwrittenCss(component);
    const overflowHiddenCss = getOverflowHiddenCss(customFeatures);
    return [
      inheritedCss || {},
      subcomponentCss[CSS_PSEUDO_CLASSES.DEFAULT],
      subcomponentCss[activeCssPseudoClass],
      { backgroundImage: customStaticFeatures?.image?.data ? 'url(' + customStaticFeatures.image.data + ')' : ''},
      getInheritedValues(activeCssPseudoClass, subcomponentCss),
      isIcon(component) ? { pointerEvents: 'none' } : {},
      buttonPaddingSubstitutedToWidthCss,
      selectedDropdownMenuTextCss,
      buttonGroupOverwrittenCss,
      overflowHiddenCss,
    ];
  };

  const getSubcomponentText = (component: WorkshopComponent): string => {
    const { customFeatures, customStaticFeatures } = component.baseSubcomponent;
    const { subcomponentText, selectDropdownText } = customStaticFeatures || {};
    const { dropdown } = customFeatures || {};
    // checks if this is a text subcomponent, if it has a select property reference (dropdown item text subcomponents do not) and whether it is enabled
    if (subcomponentText?.text && dropdown?.select?.enabled) {
      return selectDropdownText.lastSelectedItemText || selectDropdownText.defaultText;
    }
    return subcomponentText?.text || '';
  }

  return {
    isIcon,
    getStyleProperties,
    getSubcomponentText,
    getBaseContainerCss,
    getButtonGroupButtonOverwrittenCss,
  };
}

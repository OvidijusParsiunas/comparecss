import { DisplayInFrontOfSiblings } from '../../utils/componentManipulation/displayInFrontOfSiblings/displayInFrontOfSiblingsUtils';
import { ButtonGroupCompositionAPIUtils } from '../../newComponent/types/buttonGroups/utils/buttonGroupCompositionAPIUtils';
import { CompositionAPISubcomponentTriggerState } from '../../../../../interfaces/compositionAPISubcomponentTriggerState';
import { SelectDropdownUtils } from '../../newComponent/types/dropdowns/selectDropdown/selectDropdownUtils';
import { CustomCss, CustomFeatures, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../consts/subcomponentOverlayClasses.enum';
import { SubcomponentTriggers } from '../../utils/componentManipulation/utils/subcomponentTriggers';
import { TEMPORARY_COMPONENT_BASE_NAME } from '../../../../../consts/baseSubcomponentNames.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../../interfaces/workshopComponentCss';
import { SUBCOMPONENT_TYPES } from '../../../../../consts/subcomponentTypes.enum';
import { JAVASCRIPT_CLASSES } from '../../../../../consts/javascriptClasses.enum';
import { UseBaseComponent } from '../../../../../interfaces/useBaseComponent';
import { CLOSE_BUTTON_X_TEXT } from '../../../../../consts/closeButtonXText';
import { COMPONENT_TYPES } from '../../../../../consts/componentTypes.enum';
import { STATIC_POSITION_CLASS } from '../../../../../consts/sharedClasses';
import ComponentPreviewUtils from '../utils/componentPreviewUtils';

// WORK 2 - refactor to have the component right away
export default function useBaseComponent(): UseBaseComponent {

  const otherSubcomponentTriggerState: CompositionAPISubcomponentTriggerState = { subcomponent: null };

  const isIcon = (component: WorkshopComponent): boolean => {
    return component.baseSubcomponent.subcomponentType === SUBCOMPONENT_TYPES.ICON;
  };

  const isXButtonText = (component: WorkshopComponent): boolean => {
    return component.baseSubcomponent.customStaticFeatures?.subcomponentText?.text === CLOSE_BUTTON_X_TEXT;
  };

  const getBaseContainerParentStyleProperties = (component: WorkshopComponent): WorkshopComponentCss => {
    return DisplayInFrontOfSiblings.getZIndexCss(component.baseSubcomponent);
  };

  const getBaseContainerStyleProperties = (component: WorkshopComponent): WorkshopComponentCss => {
    const { top } = component.baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT];
    const baseContainerCss: WorkshopComponentCss = { top: top || '50%' };
    const buttonGroupButtonContainerCss = component.containerComponent?.type === COMPONENT_TYPES.BUTTON_GROUP
      ? ButtonGroupCompositionAPIUtils.getButtonGroupButtonContainerCss(component) : {};
    return { ...baseContainerCss, ...buttonGroupButtonContainerCss };
  };

  const getBaseContainerCssClasses = (component: WorkshopComponent, isChildComponent: boolean): string[] => {
    const classes = [];
    classes.push(isChildComponent ? 'child-component' : STATIC_POSITION_CLASS);
    if (component.cssClasses?.containerClasses) classes.push(...component.cssClasses.containerClasses);
    return classes;
  }

  const getComponentCssClasses = (component: WorkshopComponent): Set<string>|string[] => {
    return component.cssClasses?.componentClasses || [];
  }

  const getLayerCssClasses = (component: WorkshopComponent, isChildComponent: boolean, isIconOverlayTrigger?: boolean): string[] => {
    const classes: string[] = [SUBCOMPONENT_OVERLAY_CLASSES.BASE];
    if (isChildComponent) {
      classes.push('child-component');
    } else {
      classes.push(STATIC_POSITION_CLASS, 'subcomponent-overlay-with-no-border-property-but-with-height');
    }
    if (isXButtonText(component)) {
      classes.push('close-button-text-overlay-height', SUBCOMPONENT_OVERLAY_CLASSES.SUB_CONTAINER);
    } else if (isIconOverlayTrigger) {
      classes.push(SUBCOMPONENT_OVERLAY_CLASSES.OVERLAY_TRIGGER);
    } else {
      classes.push(SUBCOMPONENT_OVERLAY_CLASSES.DEFAULT);
    }
    if (component.baseSubcomponent.isTemporaryAddPreview) {
      classes.push(SUBCOMPONENT_OVERLAY_CLASSES.SUBCOMPONENT_TOGGLE_ADD);
    }
    return [...classes, ...getComponentCssClasses(component)];
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
    return component.containerComponent?.type === COMPONENT_TYPES.BUTTON_GROUP || 
        (component.activeSubcomponentName === TEMPORARY_COMPONENT_BASE_NAME.TEMPORARY
          && component.parentLayer.subcomponent.seedComponent.containerComponent.type === COMPONENT_TYPES.BUTTON_GROUP)
      ? ButtonGroupCompositionAPIUtils.getButtonGroupButtonCss(component) : {};
  }

  function getSelectedDropdownMenuTextCss(component: WorkshopComponent, subcomponentCss: CustomCss): WorkshopComponentCss {
    return SelectDropdownUtils.isTextSelected(component) ? subcomponentCss[CSS_PSEUDO_CLASSES.HOVER] : {};
  }

  const getComponentStyleProperties = (component: WorkshopComponent): WorkshopComponentCss[] => {
    const { overwrittenCustomCssObj, customCss, customFeatures, inheritedCss, activeCssPseudoClassesDropdownItem, customStaticFeatures } = component.baseSubcomponent;
    const subcomponentCss = overwrittenCustomCssObj || customCss;
    SubcomponentTriggers.triggerOtherSubcomponentsCss(component.baseSubcomponent, activeCssPseudoClassesDropdownItem, otherSubcomponentTriggerState);
    const inheritedCssFromCustomCss = ComponentPreviewUtils.getInheritedValuesFromCustomCss(activeCssPseudoClassesDropdownItem, subcomponentCss);
    const buttonPaddingSubstitutedToWidthCss = substituteButtonPaddingToWidthCss(component, subcomponentCss);
    const selectedDropdownMenuTextCss = getSelectedDropdownMenuTextCss(component, subcomponentCss);
    const buttonGroupButtonOverwrittenCss = getButtonGroupButtonOverwrittenCss(component);
    const overflowHiddenCss = getOverflowHiddenCss(customFeatures);
    return [
      inheritedCss || {},
      subcomponentCss[CSS_PSEUDO_CLASSES.DEFAULT],
      subcomponentCss[activeCssPseudoClassesDropdownItem],
      { backgroundImage: customStaticFeatures?.image?.data ? 'url(' + customStaticFeatures.image.data + ')' : ''},
      isIcon(component) ? { pointerEvents: 'none' } : {},
      inheritedCssFromCustomCss,
      buttonPaddingSubstitutedToWidthCss,
      selectedDropdownMenuTextCss,
      buttonGroupButtonOverwrittenCss,
      overflowHiddenCss,
    ];
  };

  const getOverlayStyleProperties = (component: WorkshopComponent, isChildComponent: boolean): WorkshopComponentCss => {
    const subcomponentCss = {
      ...component.baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT],
      color: '#ff000000',
      ...getBaseContainerStyleProperties(component),
      ...getButtonGroupButtonOverwrittenCss(component),
    };
    if (!isChildComponent) subcomponentCss.height = component.linkedComponents?.base ? 'unset' : '100% !important';
    if (component.baseSubcomponent.isTemporaryAddPreview) subcomponentCss.display = 'block'; 
    if (!component.linkedComponents?.base && !isChildComponent) subcomponentCss.marginTop = '0px';
    if (isIcon(component)) subcomponentCss.height = subcomponentCss.width;
    return subcomponentCss;
  }

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
    isXButtonText,
    getLayerCssClasses,
    getComponentCssClasses,
    getBaseContainerCssClasses,
    getSubcomponentText,
    getOverlayStyleProperties,
    getComponentStyleProperties,
    getBaseContainerStyleProperties,
    getBaseContainerParentStyleProperties,
  };
}

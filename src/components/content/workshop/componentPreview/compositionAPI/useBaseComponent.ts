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
import { Ref } from 'vue';

export default function useBaseComponent(component: Ref<WorkshopComponent>, isChildComponent: Ref<boolean>): UseBaseComponent {

  const otherSubcomponentTriggerState: CompositionAPISubcomponentTriggerState = { subcomponent: null };

  const isIcon = (): boolean => {
    return component.value.baseSubcomponent.subcomponentType === SUBCOMPONENT_TYPES.ICON;
  };

  const isXButtonText = (): boolean => {
    return component.value.baseSubcomponent.customStaticFeatures?.subcomponentText?.text === CLOSE_BUTTON_X_TEXT;
  };

  const getBaseContainerParentStyleProperties = (): WorkshopComponentCss => {
    return component.value.containerComponent?.type === COMPONENT_TYPES.BUTTON_GROUP
      ? ButtonGroupCompositionAPIUtils.getButtonComponentParentContainerDivCss(component.value.baseSubcomponent)
      : {};
  };

  const getBaseContainerStyleProperties = (): WorkshopComponentCss => {
    const { top } = component.value.baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT];
    const baseContainerCss: WorkshopComponentCss = { top: top || '50%' };
    const buttonGroupButtonContainerCss = component.value.containerComponent?.type === COMPONENT_TYPES.BUTTON_GROUP
      ? ButtonGroupCompositionAPIUtils.getButtonGroupButtonContainerCss(component.value) : {};
    return { ...baseContainerCss, ...buttonGroupButtonContainerCss };
  };

  const getBaseContainerCssClasses = (): string[] => {
    const classes = [];
    classes.push(isChildComponent.value ? 'child-component' : STATIC_POSITION_CLASS);
    if (component.value.cssClasses?.containerClasses) classes.push(...component.value.cssClasses.containerClasses);
    return classes;
  }

  const getComponentCssClasses = (): Set<string>|string[] => {
    return component.value.cssClasses?.componentClasses || [];
  }

  const getOverlayCssClasses = (isIconOverlayTrigger?: boolean): string[] => {
    const classes: string[] = [SUBCOMPONENT_OVERLAY_CLASSES.BASE];
    if (isChildComponent.value) {
      classes.push('child-component');
    } else {
      classes.push(STATIC_POSITION_CLASS, 'subcomponent-overlay-with-no-border-property-but-with-height');
    }
    if (isXButtonText()) {
      classes.push('close-button-text-overlay-height', SUBCOMPONENT_OVERLAY_CLASSES.SUB_CONTAINER);
    } else if (isIconOverlayTrigger) {
      classes.push(SUBCOMPONENT_OVERLAY_CLASSES.OVERLAY_TRIGGER);
    } else {
      classes.push(SUBCOMPONENT_OVERLAY_CLASSES.DEFAULT);
    }
    if (component.value.baseSubcomponent.isTemporaryAddPreview) {
      classes.push(SUBCOMPONENT_OVERLAY_CLASSES.SUBCOMPONENT_TOGGLE_ADD);
    }
    return [...classes, ...getComponentCssClasses()];
  }

  function getOverflowHiddenCss(customFeatures: CustomFeatures): WorkshopComponentCss {
    if (customFeatures?.jsClasses?.has(JAVASCRIPT_CLASSES.RIPPLES)) {
      return { overflow: 'hidden' };
    }
    return {};
  }

  // part of a fix to make sure that the ripples are rendered on the layers and not on the bases of button components as
  // the overflow: hidden property on the base does not prevent the ripples from leaving the button when the base is clicked
  function substituteButtonPaddingToWidthCss(subcomponentCss: CustomCss): WorkshopComponentCss {
    const buttonPaddingSubstitutedToWidth: WorkshopComponentCss = {};
    if (component.value.type === COMPONENT_TYPES.BUTTON || component.value.type === COMPONENT_TYPES.DROPDOWN) {
      const { paddingLeft, paddingRight, width } = subcomponentCss[CSS_PSEUDO_CLASSES.DEFAULT];
      const newWidth = `${Number.parseFloat(paddingLeft) + Number.parseFloat(width) + Number.parseFloat(paddingRight)}px`;
      buttonPaddingSubstitutedToWidth.paddingLeft = '0px';
      buttonPaddingSubstitutedToWidth.paddingRight = '0px';
      buttonPaddingSubstitutedToWidth.width = newWidth;
    }
    return buttonPaddingSubstitutedToWidth;
  }

  function getButtonGroupButtonOverwrittenCss(): WorkshopComponentCss {
    return component.value.containerComponent?.type === COMPONENT_TYPES.BUTTON_GROUP || 
        (component.value.activeSubcomponentName === TEMPORARY_COMPONENT_BASE_NAME.TEMPORARY
          && component.value.parentLayer.subcomponent.seedComponent.containerComponent.type === COMPONENT_TYPES.BUTTON_GROUP)
      ? ButtonGroupCompositionAPIUtils.getButtonGroupButtonCss(component.value) : {};
  }

  function getSelectedComponentCss(subcomponentCss: CustomCss): WorkshopComponentCss {
    return component.value.baseSubcomponent.customStaticFeatures?.isCurrentlySelected ? subcomponentCss[CSS_PSEUDO_CLASSES.HOVER] : {};
  }

  function getSelectedDropdownMenuTextCss(subcomponentCss: CustomCss): WorkshopComponentCss {
    return SelectDropdownUtils.isTextSelected(component.value) ? subcomponentCss[CSS_PSEUDO_CLASSES.HOVER] : {};
  }

  const getComponentStyleProperties = (): WorkshopComponentCss[] => {
    const { overwrittenCustomCssObj, customCss, customFeatures, inheritedCss, activeCssPseudoClassesDropdownItem, customStaticFeatures } = component.value.baseSubcomponent;
    const subcomponentCss = overwrittenCustomCssObj || customCss;
    SubcomponentTriggers.triggerOtherSubcomponentsCss(component.value.baseSubcomponent, activeCssPseudoClassesDropdownItem, otherSubcomponentTriggerState);
    const inheritedCssFromCustomCss = ComponentPreviewUtils.getInheritedValuesFromCustomCss(activeCssPseudoClassesDropdownItem, subcomponentCss);
    const buttonPaddingSubstitutedToWidthCss = substituteButtonPaddingToWidthCss(subcomponentCss);
    const selectedDropdownMenuTextCss = getSelectedDropdownMenuTextCss(subcomponentCss);
    const selectedComponentCss = getSelectedComponentCss(subcomponentCss);
    const buttonGroupButtonOverwrittenCss = getButtonGroupButtonOverwrittenCss();
    const overflowHiddenCss = getOverflowHiddenCss(customFeatures);
    return [
      inheritedCss || {},
      subcomponentCss[CSS_PSEUDO_CLASSES.DEFAULT],
      subcomponentCss[activeCssPseudoClassesDropdownItem],
      { backgroundImage: customStaticFeatures?.image?.data ? 'url(' + customStaticFeatures.image.data + ')' : ''},
      isIcon() ? { pointerEvents: 'none' } : {},
      inheritedCssFromCustomCss,
      buttonPaddingSubstitutedToWidthCss,
      selectedDropdownMenuTextCss,
      selectedComponentCss,
      buttonGroupButtonOverwrittenCss,
      overflowHiddenCss,
    ];
  };

  const getOverlayStyleProperties = (): WorkshopComponentCss => {
    const subcomponentCss = {
      ...component.value.baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT],
      color: '#ff000000',
      ...getBaseContainerStyleProperties(),
      ...getButtonGroupButtonOverwrittenCss(),
    };
    if (!isChildComponent.value) subcomponentCss.height = component.value.linkedComponents?.base ? 'unset' : '100% !important';
    if (component.value.baseSubcomponent.isTemporaryAddPreview) subcomponentCss.display = 'block'; 
    if (!component.value.linkedComponents?.base && !isChildComponent.value) subcomponentCss.marginTop = '0px';
    if (component.value.type === COMPONENT_TYPES.BUTTON_GROUP) subcomponentCss.marginLeft = ButtonGroupCompositionAPIUtils.getOverlayMarginLeftCss(component.value);
    if (isIcon()) subcomponentCss.height = subcomponentCss.width;
    return subcomponentCss;
  }

  const getSubcomponentText = (): string => {
    const { customFeatures, customStaticFeatures } = component.value.baseSubcomponent;
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
    getOverlayCssClasses,
    getComponentCssClasses,
    getBaseContainerCssClasses,
    getSubcomponentText,
    getOverlayStyleProperties,
    getComponentStyleProperties,
    getBaseContainerStyleProperties,
    getBaseContainerParentStyleProperties,
  };
}

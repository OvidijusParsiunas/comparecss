import { SelectedChildComponentUtils } from '../../utils/componentManipulation/selectedChildComponent/selectedChildComponentUtils';
import { CustomCss, CustomFeatures, CustomStaticFeatures, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { ButtonGroupCompositionAPIUtils } from '../../newComponent/types/buttonGroups/utils/buttonGroupCompositionAPIUtils';
import { CompositionAPISubcomponentTriggerState } from '../../../../../interfaces/compositionAPISubcomponentTriggerState';
import { ACTIVE_CSS_PSEUDO_CLASSES, CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { SelectDropdownUtils } from '../../newComponent/types/dropdowns/selectDropdown/selectDropdownUtils';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../consts/subcomponentOverlayClasses.enum';
import { SubcomponentTriggers } from '../../utils/componentManipulation/utils/subcomponentTriggers';
import { BORDER_WIDTH_CSS_PROPERTY_ALIAS } from '../../../../../consts/borderWidthAlias';
import { CustomCssUtils } from '../../utils/componentManipulation/utils/customCssUtils';
import { WorkshopComponentCss } from '../../../../../interfaces/workshopComponentCss';
import { JAVASCRIPT_CLASSES } from '../../../../../consts/javascriptClasses.enum';
import { UseBaseComponent } from '../../../../../interfaces/useBaseComponent';
import { UseIconComponent } from '../../../../../interfaces/useIconComponent';
import { CLOSE_BUTTON_X_TEXT } from '../../../../../consts/closeButtonXText';
import { COMPONENT_TYPES } from '../../../../../consts/componentTypes.enum';
import { STATIC_POSITION_CLASS } from '../../../../../consts/sharedClasses';
import ComponentPreviewUtils from '../utils/componentPreviewUtils';
import { ICON_TYPES } from '../../../../../consts/iconTypes.enum';
import { Ref } from 'vue';

export default function useBaseComponent(component: Ref<WorkshopComponent>, isChildComponent: Ref<boolean>, useIconComponent: UseIconComponent): UseBaseComponent {

  const otherSubcomponentTriggerState: CompositionAPISubcomponentTriggerState = { subcomponent: null };

  const isXButtonText = (): boolean => {
    return component.value.baseSubcomponent.customStaticFeatures?.subcomponentText?.text === CLOSE_BUTTON_X_TEXT;
  };

  const getBaseContainerParentStyleProperties = (): WorkshopComponentCss => {
    return ButtonGroupCompositionAPIUtils.isButtonGroupComponentButton(component.value)
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

  function buildBackgroundImageURL(imageData: string): string {
    return 'url(' + imageData + ')';
  }

  function getIconCss(customStaticFeatures: CustomStaticFeatures, customCss: CustomCss): WorkshopComponentCss {
    if (customStaticFeatures.icon.type === ICON_TYPES.CUSTOM) {
      return { backgroundImage: buildBackgroundImageURL(customStaticFeatures.icon.svgImage.data) };
    }
    const heightNumber = Number.parseFloat(customCss[CSS_PSEUDO_CLASSES.DEFAULT].height);
    return { height: `${heightNumber * 2}px` };
  }

  function getImageCss(customStaticFeatures: CustomStaticFeatures, customCss: CustomCss): WorkshopComponentCss {
    if (component.value.type === COMPONENT_TYPES.IMAGE) {
      return { backgroundImage: buildBackgroundImageURL(customStaticFeatures.image.data) };
    }
    if (useIconComponent.isIcon()) {
      return getIconCss(customStaticFeatures, customCss);
    }
    return { backgroundImage: '' };
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
      const newWidth = `${Number.parseFloat(paddingLeft) + Number.parseFloat(paddingRight) + Number.parseFloat(width)}px`;
      buttonPaddingSubstitutedToWidth.paddingLeft = '0px';
      buttonPaddingSubstitutedToWidth.paddingRight = '0px';
      buttonPaddingSubstitutedToWidth.width = newWidth;
    }
    return buttonPaddingSubstitutedToWidth;
  }

  function getOverwrittenBorderAndMarginCss(activeSubcomponentCss: WorkshopComponentCss): WorkshopComponentCss {
    if (ButtonGroupCompositionAPIUtils.isButtonGroupComponentButton(component.value)) {
      return ButtonGroupCompositionAPIUtils.getButtonGroupButtonCss(component.value);
    }
    if (activeSubcomponentCss[BORDER_WIDTH_CSS_PROPERTY_ALIAS] && activeSubcomponentCss[BORDER_WIDTH_CSS_PROPERTY_ALIAS] !== '0px') {
      return CustomCssUtils.getComponentBorderBasedOnAlias(activeSubcomponentCss[BORDER_WIDTH_CSS_PROPERTY_ALIAS]);
    }
    return {};
  }

  function getInheritedCss(activeCssPseudoClassesDropdownItem: CSS_PSEUDO_CLASSES, subcomponentCss: CustomCss): WorkshopComponentCss {
    return activeCssPseudoClassesDropdownItem !== CSS_PSEUDO_CLASSES.DEFAULT
      ? ComponentPreviewUtils.getInheritedValuesFromCustomCss(activeCssPseudoClassesDropdownItem, subcomponentCss) : {};
  }

  function getSelectedDropdownMenuTextCss(subcomponentCss: CustomCss): WorkshopComponentCss {
    return SelectDropdownUtils.isTextSelected(component.value) ? subcomponentCss[CSS_PSEUDO_CLASSES.HOVER] : {};
  }

  function getActiveSubcomponentCss(customCss: CustomCss, cssPseudoClass: CSS_PSEUDO_CLASSES): WorkshopComponentCss {
    const inheritedCssFromCustomCss = getInheritedCss(cssPseudoClass, customCss);
    return { ...customCss[CSS_PSEUDO_CLASSES.DEFAULT], ...customCss[cssPseudoClass], ...inheritedCssFromCustomCss };
  }

  function getCssPseudoClass(activeCssPseudoClassesDropdownItem: CSS_PSEUDO_CLASSES): CSS_PSEUDO_CLASSES {
    return activeCssPseudoClassesDropdownItem === CSS_PSEUDO_CLASSES.DEFAULT
        && SelectedChildComponentUtils.isSelectedAndStyleActive(component.value.baseSubcomponent)
      ? SelectedChildComponentUtils.getChildContainerSelectComponentObj(component.value).activeStyle as ACTIVE_CSS_PSEUDO_CLASSES
      : activeCssPseudoClassesDropdownItem;
  }

  const getComponentStyleProperties = (): WorkshopComponentCss[] => {
    const { overwrittenCustomCssObj, customCss, customFeatures, inheritedCss, activeCssPseudoClassesDropdownItem, customStaticFeatures } = component.value.baseSubcomponent;
    const subcomponentCss = overwrittenCustomCssObj || customCss;
    SubcomponentTriggers.triggerOtherSubcomponentsCss(component.value.baseSubcomponent, activeCssPseudoClassesDropdownItem, otherSubcomponentTriggerState);
    const cssPseudoClass = getCssPseudoClass(activeCssPseudoClassesDropdownItem);
    const activeSubcomponentCss = getActiveSubcomponentCss(subcomponentCss, cssPseudoClass);
    const backgroundImageCss = getImageCss(customStaticFeatures, customCss);
    const buttonPaddingSubstitutedToWidthCss = substituteButtonPaddingToWidthCss(subcomponentCss);
    const selectedDropdownMenuTextCss = getSelectedDropdownMenuTextCss(subcomponentCss);
    const buttonGroupButtonOverwrittenCss = getOverwrittenBorderAndMarginCss(activeSubcomponentCss);
    const overflowHiddenCss = getOverflowHiddenCss(customFeatures);
    return [
      inheritedCss || {},
      activeSubcomponentCss,
      backgroundImageCss,
      buttonPaddingSubstitutedToWidthCss,
      selectedDropdownMenuTextCss,
      buttonGroupButtonOverwrittenCss,
      overflowHiddenCss,
    ];
  };

  const getOverlayStyleProperties = (): WorkshopComponentCss => {
    const { customCss } = component.value.baseSubcomponent;
    const { activeCssPseudoClassesDropdownItem } = component.value.baseSubcomponent;
    const activeSubcomponentCss = getActiveSubcomponentCss(customCss, activeCssPseudoClassesDropdownItem);
    const overlayCss = {
      ...activeSubcomponentCss,
      color: '#ff000000',
      ...getBaseContainerStyleProperties(),
      ...getOverwrittenBorderAndMarginCss(activeSubcomponentCss),
    };
    if (!isChildComponent.value) overlayCss.height = component.value.linkedComponents?.base ? 'unset' : '100% !important';
    if (component.value.baseSubcomponent.isTemporaryAddPreview) overlayCss.display = 'block'; 
    if (!component.value.linkedComponents?.base && !isChildComponent.value) overlayCss.marginTop = '0px';
    if (component.value.type === COMPONENT_TYPES.BUTTON_GROUP) overlayCss.marginLeft = ButtonGroupCompositionAPIUtils.getOverlayMarginLeftCss(component.value);
    if (useIconComponent.isSVGIcon()) useIconComponent.setOverlayCustomCss(overlayCss);
    return overlayCss;
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

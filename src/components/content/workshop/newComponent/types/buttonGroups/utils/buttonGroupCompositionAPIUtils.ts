import { AutoSyncedSiblingComponentUtils } from '../../../../utils/componentManipulation/autoSyncedSiblingComponentUtils/autoSyncedSiblingComponentUtils';
import { DisplayInFrontOfSiblings } from '../../../../utils/componentManipulation/displayInFrontOfSiblings/displayInFrontOfSiblingsUtils';
import { SelectedChildComponentUtil } from '../../../../utils/componentManipulation/selectedChildComponent/selectedChildComponentUtil';
import { ACTIVE_CSS_PSEUDO_CLASSES, CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SyncChildComponentUtils } from '../../../../toolbar/options/syncChildComponent/syncChildComponentUtils';
import { CustomCss, Subcomponent, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { BUTTON_GROUP_BUTTON_CLASSES } from '../../../../../../../consts/buttonGroupButtonClasses.enum';
import { TEMPORARY_COMPONENT_BASE_NAME } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { BORDER_WIDTH_CSS_PROPERTY_ALIAS } from '../../../../../../../consts/borderWidthAlias';
import ComponentPreviewUtils from '../../../../componentPreview/utils/componentPreviewUtils';
import { WorkshopComponentCss } from '../../../../../../../interfaces/workshopComponentCss';
import { ButtonGroupStylePropertiesUtils } from './buttonGroupStylePropertiesUtils';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';

export class ButtonGroupCompositionAPIUtils {

  private static setButtonBorderProperties(component: WorkshopComponent, cssToOverwrite: WorkshopComponentCss): void {
    const { componentClasses } = component.cssClasses;
    const { borderTopWidth } = component.baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT];
    if (componentClasses.has(BUTTON_GROUP_BUTTON_CLASSES.BUTTON_GROUP_LEFT_BUTTON)) {
      cssToOverwrite.borderLeftWidth = borderTopWidth;
    } else if (componentClasses.has(BUTTON_GROUP_BUTTON_CLASSES.BUTTON_GROUP_RIGHT_BUTTON)) {
      cssToOverwrite.borderRightWidth = borderTopWidth;
    } else if (componentClasses.has(BUTTON_GROUP_BUTTON_CLASSES.BUTTON_GROUP_SINGLE_BUTTON)) {
      cssToOverwrite.borderRightWidth = borderTopWidth;
      cssToOverwrite.borderLeftWidth = borderTopWidth; 
    }
  }

  private static canPropertiesBeOverwritten(component: WorkshopComponent): boolean {
    return !!SyncChildComponentUtils.getCurrentOrParentComponentThatIsInSync(component)
      // this is used to identify if the button has been temporarily synced during sync mode (as tempOriginalCustomProperties is only appended
      // to the one button group button that is currently selected) 
      || AutoSyncedSiblingComponentUtils.getParentLayerSiblingChildComponentsAutoSyncedObject(component).areChildrenComponentsTemporarilySynced;
  }

  private static getOverwrittenCss(subcomponent: Subcomponent, overwrittenCss: CustomCss): WorkshopComponentCss {
    if (!overwrittenCss) return;
    if (SelectedChildComponentUtil.isSelectedAndStyleActive(subcomponent)) {
      return overwrittenCss[SelectedChildComponentUtil.getStyle(subcomponent)];
    }
    if (subcomponent.activeCssPseudoClassViaUserAction !== CSS_PSEUDO_CLASSES.DEFAULT) {
      return overwrittenCss[subcomponent.activeCssPseudoClassViaUserAction];
    }
    if (subcomponent.activeCssPseudoClassesDropdownItem !== CSS_PSEUDO_CLASSES.DEFAULT) {
      return overwrittenCss[subcomponent.activeCssPseudoClassesDropdownItem];
    }
    return overwrittenCss[CSS_PSEUDO_CLASSES.DEFAULT];
  }

  public static getButtonGroupButtonCss(component: WorkshopComponent): WorkshopComponentCss {
    let cssToOverwrite: WorkshopComponentCss = {};
    if (ButtonGroupCompositionAPIUtils.canPropertiesBeOverwritten(component)) {
      const overwriteCssForSyncedComponentObj = AutoSyncedSiblingComponentUtils.getOverwriteCssForSyncedComponentObj(component);
      if (overwriteCssForSyncedComponentObj) {
        // used to prevent calculations from being executed for each button and when the user changes the button css pseudo class
        cssToOverwrite = { ...ButtonGroupCompositionAPIUtils.getOverwrittenCss(component.baseSubcomponent, overwriteCssForSyncedComponentObj) };
      } else {
        ButtonGroupStylePropertiesUtils.setBorderAndMarginCss(component, cssToOverwrite);
      }
    }
    ButtonGroupCompositionAPIUtils.setButtonBorderProperties(component, cssToOverwrite);
    cssToOverwrite.boxShadow = '';
    return cssToOverwrite;
  }

  private static setOverwrittenBoxShadow(baseSubcomponent: Subcomponent, subcomponentCss: CustomCss,
      buttonGroupButtonContainerCss: WorkshopComponentCss): void {
    let cssPseudoClass = baseSubcomponent.activeCssPseudoClassesDropdownItem;
    let currentSubcomponentCss = subcomponentCss;
    if (SelectedChildComponentUtil.isSelectedAndStyleActive(baseSubcomponent)) {
      cssPseudoClass = SelectedChildComponentUtil.getStyle(baseSubcomponent) as ACTIVE_CSS_PSEUDO_CLASSES;
      currentSubcomponentCss = baseSubcomponent.customCss;
    }
    // important to remember that we are passing subcomponentCss and not customCss
    const inheritedCssFromCustomCss = ComponentPreviewUtils.getInheritedValuesFromCustomCss(cssPseudoClass,
      currentSubcomponentCss, 'boxShadow');
    buttonGroupButtonContainerCss.boxShadow = inheritedCssFromCustomCss.boxShadow;
  }

  private static setOverwrittenBoundingBox(component: WorkshopComponent, buttonGroupButtonContainerCss: WorkshopComponentCss): void {    
    const overwriteCssForSyncedComponentObj = AutoSyncedSiblingComponentUtils.getOverwriteCssForSyncedComponentObj(component);
    buttonGroupButtonContainerCss.boxShadow = overwriteCssForSyncedComponentObj
      ? ButtonGroupCompositionAPIUtils.getOverwrittenCss(component.baseSubcomponent, overwriteCssForSyncedComponentObj).boxShadow
      : '';
  }

  public static getButtonGroupButtonContainerCss(component: WorkshopComponent): WorkshopComponentCss {
    const { overwrittenCustomCssObj, customCss } = component.baseSubcomponent;
    const subcomponentCss = overwrittenCustomCssObj || customCss;
    const buttonGroupButtonContainerCss: WorkshopComponentCss = {};
    if (ButtonGroupCompositionAPIUtils.canPropertiesBeOverwritten(component)) {
      ButtonGroupCompositionAPIUtils.setOverwrittenBoundingBox(component, buttonGroupButtonContainerCss);
    } else {
      ButtonGroupCompositionAPIUtils.setOverwrittenBoxShadow(component.baseSubcomponent, subcomponentCss, buttonGroupButtonContainerCss);
    }
    buttonGroupButtonContainerCss.transition = subcomponentCss[CSS_PSEUDO_CLASSES.DEFAULT].transition;
    buttonGroupButtonContainerCss.borderRadius = subcomponentCss[CSS_PSEUDO_CLASSES.DEFAULT].borderRadius;
    return buttonGroupButtonContainerCss;
  }

  // setting to -2px due to chrome bug where there is a white horizontal border when top/bottom borders are set with 0px < widths
  private static getMarginLeft(borderWidthNumber: number): string {
    if (borderWidthNumber === 0) {
      return '-2px';
    }
    const newBorderWidthNumber = borderWidthNumber > 2 ? 2 : borderWidthNumber;
    return `-${newBorderWidthNumber}px`;
  }

  public static getButtonComponentParentContainerDivCss(baseSubcomponent: Subcomponent): WorkshopComponentCss {
    const buttonComponentParentContainerDivCss: WorkshopComponentCss = {};
    const borderWidth = baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT][BORDER_WIDTH_CSS_PROPERTY_ALIAS];
    const borderWidthNumber = Number.parseFloat(borderWidth);
    const marginLeft = ButtonGroupCompositionAPIUtils.getMarginLeft(borderWidthNumber);
    buttonComponentParentContainerDivCss.marginLeft = marginLeft;
    buttonComponentParentContainerDivCss.zIndex = DisplayInFrontOfSiblings.getZIndex(baseSubcomponent);
    return buttonComponentParentContainerDivCss;
  }

  public static getOverlayMarginLeftCss(buttonGroupComponent: WorkshopComponent): string {
    const { marginLeft } = buttonGroupComponent.baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT];
    const marginLeftNumber = Number.parseFloat(marginLeft);
    return `${marginLeftNumber - 2}px`;
  }

  public static isButtonGroupComponentButton(component: WorkshopComponent): boolean {
    return component.containerComponent?.type === COMPONENT_TYPES.BUTTON_GROUP || 
      (component.activeSubcomponentName === TEMPORARY_COMPONENT_BASE_NAME.TEMPORARY
        && component.parentLayer.subcomponent.seedComponent.containerComponent.type === COMPONENT_TYPES.BUTTON_GROUP);
  }
}

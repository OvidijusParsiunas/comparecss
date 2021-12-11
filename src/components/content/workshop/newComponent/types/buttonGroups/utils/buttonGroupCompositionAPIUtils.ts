import { AutoSyncedSiblingComponentUtils } from '../../../../utils/componentManipulation/autoSyncedSiblingComponentUtils/autoSyncedSiblingComponentUtils';
import { DisplayInFrontOfSiblings } from '../../../../utils/componentManipulation/displayInFrontOfSiblings/displayInFrontOfSiblingsUtils';
import { SelectedChildComponentUtil } from '../../../../utils/componentManipulation/selectedChildComponent/selectedChildComponentUtil';
import { ACTIVE_CSS_PSEUDO_CLASSES, CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SyncChildComponentUtils } from '../../../../toolbar/options/syncChildComponent/syncChildComponentUtils';
import { CustomCss, Subcomponent, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { BUTTON_GROUP_BUTTON_CLASSES } from '../../../../../../../consts/buttonGroupButtonClasses.enum';
import { BORDER_WIDTH_CSS_PROPERTY_ALIAS } from '../../../../../../../consts/borderWidthAlias';
import { CustomCssUtils } from '../../../../utils/componentManipulation/utils/customCssUtils';
import ComponentPreviewUtils from '../../../../componentPreview/utils/componentPreviewUtils';
import { WorkshopComponentCss } from '../../../../../../../interfaces/workshopComponentCss';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';

export class ButtonGroupCompositionAPIUtils {

  private static readonly ZERO_PIXELS = '0px';

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

  private static setMargin(cssToOverwrite: WorkshopComponentCss): void {
    cssToOverwrite.marginTop = ButtonGroupCompositionAPIUtils.ZERO_PIXELS;
    cssToOverwrite.marginBottom = ButtonGroupCompositionAPIUtils.ZERO_PIXELS;
    cssToOverwrite.marginRight = ButtonGroupCompositionAPIUtils.ZERO_PIXELS;
    cssToOverwrite.marginLeft = ButtonGroupCompositionAPIUtils.ZERO_PIXELS;
  }

  private static setSideBorders(component: WorkshopComponent, cssToOverwrite: WorkshopComponentCss): void {
    const borderWidth = component.baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT][BORDER_WIDTH_CSS_PROPERTY_ALIAS];
    const borderWidthNumber = Number.parseFloat(borderWidth);
    const newSideBorderWidth = borderWidthNumber > 2 ? '2px' : borderWidth;
    cssToOverwrite.borderLeftWidth = newSideBorderWidth;
    cssToOverwrite.borderRightWidth = newSideBorderWidth;
  }

  private static setBorderAndMarginCss(component: WorkshopComponent, cssToOverwrite: WorkshopComponentCss): void {
    ButtonGroupCompositionAPIUtils.setSideBorders(component, cssToOverwrite);
    ButtonGroupCompositionAPIUtils.setMargin(cssToOverwrite);
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
      const { overwriteCssForSyncedComponent } = component.parentLayer.subcomponent.seedComponent.sync.siblingChildComponentsAutoSynced;
      if (overwriteCssForSyncedComponent) {
        // used to prevent calculations from being executed for each button and when the user changes the button css pseudo class
        cssToOverwrite = { ...ButtonGroupCompositionAPIUtils.getOverwrittenCss(component.baseSubcomponent, overwriteCssForSyncedComponent) };
      } else {
        ButtonGroupCompositionAPIUtils.setBorderAndMarginCss(component, cssToOverwrite);
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
    const { overwriteCssForSyncedComponent } = component.parentLayer.subcomponent.seedComponent.sync.siblingChildComponentsAutoSynced;
    buttonGroupButtonContainerCss.boxShadow = overwriteCssForSyncedComponent
      ? ButtonGroupCompositionAPIUtils.getOverwrittenCss(component.baseSubcomponent, overwriteCssForSyncedComponent).boxShadow
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

  private static getBoxShadowValue(subcomponent: Subcomponent, activeCssPseudoClassesDropdownItem: CSS_PSEUDO_CLASSES): string {
    return subcomponent.customCss[activeCssPseudoClassesDropdownItem].boxShadow === CSS_PROPERTY_VALUES.INHERIT
      ? ComponentPreviewUtils.getInheritedCustomCssValue(activeCssPseudoClassesDropdownItem, subcomponent.customCss, 'boxShadow')
      : subcomponent.customCss[activeCssPseudoClassesDropdownItem].boxShadow;
  }

  private static setBoxShadowWithoutOffsetAndBlur(subcomponent: Subcomponent, activeCssPseudoClassesDropdownItem: CSS_PSEUDO_CLASSES,
      newDefaultProperties: WorkshopComponentCss): void {
    const boxShadowPropertyVal = ButtonGroupCompositionAPIUtils.getBoxShadowValue(subcomponent, activeCssPseudoClassesDropdownItem);
    if (boxShadowPropertyVal !== CSS_PROPERTY_VALUES.UNSET) {
      const boxShadowProps = boxShadowPropertyVal.split(' ');
      const shadowSpread = boxShadowProps[3];
      const shadowColor = boxShadowProps[4];
      newDefaultProperties.boxShadow = `0px 0px 0px ${shadowSpread} ${shadowColor}`;
    }
  }

  private static setOverwriteCssForSyncedComponentShadow(component: WorkshopComponent, overwriteCssForSyncedComponent: CustomCss): void {
    overwriteCssForSyncedComponent[CSS_PSEUDO_CLASSES.DEFAULT].boxShadow = CSS_PROPERTY_VALUES.UNSET;
    ButtonGroupCompositionAPIUtils.setBoxShadowWithoutOffsetAndBlur(component.baseSubcomponent,
      CSS_PSEUDO_CLASSES.HOVER, overwriteCssForSyncedComponent[CSS_PSEUDO_CLASSES.HOVER]);
    ButtonGroupCompositionAPIUtils.setBoxShadowWithoutOffsetAndBlur(component.baseSubcomponent,
      CSS_PSEUDO_CLASSES.CLICK, overwriteCssForSyncedComponent[CSS_PSEUDO_CLASSES.CLICK]);
  }

  private static setOverwriteCssForSyncedComponentBorder(component: WorkshopComponent, overwriteCssForSyncedComponent: CustomCss): void {
    ButtonGroupCompositionAPIUtils.setBorderAndMarginCss(component, overwriteCssForSyncedComponent[CSS_PSEUDO_CLASSES.DEFAULT]);
    overwriteCssForSyncedComponent[CSS_PSEUDO_CLASSES.HOVER] = { ...overwriteCssForSyncedComponent[CSS_PSEUDO_CLASSES.DEFAULT] };
    overwriteCssForSyncedComponent[CSS_PSEUDO_CLASSES.CLICK] = { ...overwriteCssForSyncedComponent[CSS_PSEUDO_CLASSES.DEFAULT] };
  }

  // used to prevent calculations from being executed for each button and when the user changes the button css pseudo class
  public static setOverwriteCssForSyncedComponent(component: WorkshopComponent): void {
    const overwriteCssForSyncedComponent = CustomCssUtils.createNewCustomCssObj();
    ButtonGroupCompositionAPIUtils.setOverwriteCssForSyncedComponentBorder(component, overwriteCssForSyncedComponent);
    ButtonGroupCompositionAPIUtils.setOverwriteCssForSyncedComponentShadow(component, overwriteCssForSyncedComponent);
    const siblingChildComponentsAutoSynced = AutoSyncedSiblingComponentUtils.getParentLayerSiblingChildComponentsAutoSyncedObject(component);
    siblingChildComponentsAutoSynced.overwriteCssForSyncedComponent = overwriteCssForSyncedComponent;
  }

  public static unsetOverwriteCssForSyncedComponent(component: WorkshopComponent): void {
    const siblingChildComponentsAutoSynced = AutoSyncedSiblingComponentUtils.getParentLayerSiblingChildComponentsAutoSyncedObject(component);
    delete siblingChildComponentsAutoSynced.overwriteCssForSyncedComponent;
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
}

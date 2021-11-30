import { AutoSyncedSiblingComponentUtils } from '../../../../utils/componentManipulation/autoSyncedSiblingComponentUtils/autoSyncedSiblingComponentUtils';
import { SyncChildComponentUtils } from '../../../../toolbar/options/syncChildComponent/syncChildComponentUtils';
import { CustomCss, Subcomponent, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { BUTTON_GROUP_BUTTON_POSITION_TYPES } from '../../../../../../../consts/buttonGroupSideBorders.enum';
import { BORDER_WIDTH_CSS_PROPERTY_ALIAS } from '../../../../../../../consts/borderWidthAlias';
import { CustomCssUtils } from '../../../../utils/componentManipulation/utils/customCssUtils';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import ComponentPreviewUtils from '../../../../componentPreview/utils/componentPreviewUtils';
import { WorkshopComponentCss } from '../../../../../../../interfaces/workshopComponentCss';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';

export class ButtonGroupCompositionAPIUtils {

  private static readonly ZERO_PIXELS = '0px';

  private static setButtonBorderProperties(component: WorkshopComponent, cssToOverwrite: WorkshopComponentCss): void {
    const { buttonGroupButtonPositionType } = component.baseSubcomponent.customStaticFeatures || {};
    // WORK 3 - buttonGroupButtonPositionType should no longer be needed and component classes should be used instead
    if (buttonGroupButtonPositionType !== undefined) {
      const { borderTopWidth } = component.baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT];
      switch (buttonGroupButtonPositionType) {
        case BUTTON_GROUP_BUTTON_POSITION_TYPES.LEFT:
          cssToOverwrite.borderLeftWidth = borderTopWidth;
          break;
        case BUTTON_GROUP_BUTTON_POSITION_TYPES.RIGHT:
          cssToOverwrite.borderRightWidth = borderTopWidth;
          break;
        case BUTTON_GROUP_BUTTON_POSITION_TYPES.SINGLE:
          cssToOverwrite.borderRightWidth = borderTopWidth;
          cssToOverwrite.borderLeftWidth = borderTopWidth; 
          break;
        default:
          break;
      }
    }
  }

  private static setMarginLeft(borderWidthNumber: number, cssToOverwrite: WorkshopComponentCss): void {
    if (borderWidthNumber === 0) {
      cssToOverwrite.marginLeft = '-2px';
    } else {
      const newBorderWidthNumber = borderWidthNumber > 2 ? 2 : borderWidthNumber;
      cssToOverwrite.marginLeft = `-${newBorderWidthNumber}px`;
    }
  }

  private static setMargin(borderWidthNumber: number, cssToOverwrite: WorkshopComponentCss): void {
    cssToOverwrite.marginTop = ButtonGroupCompositionAPIUtils.ZERO_PIXELS;
    cssToOverwrite.marginBottom = ButtonGroupCompositionAPIUtils.ZERO_PIXELS;
    cssToOverwrite.marginRight = ButtonGroupCompositionAPIUtils.ZERO_PIXELS;
    ButtonGroupCompositionAPIUtils.setMarginLeft(borderWidthNumber, cssToOverwrite);
  }

  private static setSideBorders(borderWidthNumber: number, borderWidth: string, cssToOverwrite: WorkshopComponentCss): void {
    const newSideBorderWidth = borderWidthNumber > 2 ? '2px' : borderWidth;
    cssToOverwrite.borderLeftWidth = newSideBorderWidth;
    cssToOverwrite.borderRightWidth = newSideBorderWidth;
  }

  private static setBorderAndMarginCss(component: WorkshopComponent, cssToOverwrite: WorkshopComponentCss): void {
    const borderWidth = component.baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT][BORDER_WIDTH_CSS_PROPERTY_ALIAS];
    const borderWidthNumber = Number.parseFloat(borderWidth);
    ButtonGroupCompositionAPIUtils.setSideBorders(borderWidthNumber, borderWidth, cssToOverwrite);
    ButtonGroupCompositionAPIUtils.setMargin(borderWidthNumber, cssToOverwrite);
  }

  private static canPropertiesBeOverwritten(component: WorkshopComponent): boolean {
    return !!SyncChildComponentUtils.getCurrentOrParentComponentThatIsInSync(component)
      // this is used to identify if the button has been temporarily synced during sync mode (as tempOriginalCustomProperties is only appended
      // to the one button group button that is currently selected) 
      || AutoSyncedSiblingComponentUtils.getParentLayerSiblingChildComponentsAutoSyncedObject(component).areChildrenComponentsTemporarilySynced;
  }

  private static getOverwrittenCss(subcomponent: Subcomponent, overwrittenCss: CustomCss): WorkshopComponentCss {
    if (!overwrittenCss) return;
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
      const { overwriteCssForSyncedComponent } = component.parentLayer.subcomponent.seedComponent.sync.siblingChildComponentsAutoSynced
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

  public static getButtonGroupButtonContainerCss(component: WorkshopComponent): WorkshopComponentCss {
    const { overwrittenCustomCssObj, customCss, activeCssPseudoClassesDropdownItem } = component.baseSubcomponent;
    const subcomponentCss = overwrittenCustomCssObj || customCss;
    const inheritedCssFromCustomCss = ComponentPreviewUtils.getInheritedValuesFromCustomCss(activeCssPseudoClassesDropdownItem, subcomponentCss);
    const buttonGroupButtonContainerCss: WorkshopComponentCss = {};
    buttonGroupButtonContainerCss.boxShadow = inheritedCssFromCustomCss.boxShadow;
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
    overwriteCssForSyncedComponent[CSS_PSEUDO_CLASSES.DEFAULT].boxShadow = '';
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
    if (siblingChildComponentsAutoSynced.overwriteCssForSyncedComponent) {
      const { customCss } = component.baseSubcomponent;
      Object.keys(siblingChildComponentsAutoSynced.overwriteCssForSyncedComponent).forEach((cssPseudoClass) => {
        const workshopCss: WorkshopComponentCss = siblingChildComponentsAutoSynced.overwriteCssForSyncedComponent[cssPseudoClass];
        Object.assign(customCss[cssPseudoClass], workshopCss);
      });
      delete siblingChildComponentsAutoSynced.overwriteCssForSyncedComponent;
    }
  }
}

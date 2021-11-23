import { SiblingChildComponentsAutoSynced } from '../../../../../../../interfaces/siblingChildComponentsAutoSynced';
import { SyncChildComponentUtils } from '../../../../toolbar/options/syncChildComponent/syncChildComponentUtils';
import { CustomCss, Subcomponent, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CustomCssUtils } from '../../../../utils/componentManipulation/utils/customCssUtils';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import ComponentPreviewUtils from '../../../../componentPreview/utils/componentPreviewUtils';
import { WorkshopComponentCss } from '../../../../../../../interfaces/workshopComponentCss';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';

export class ButtonGroupCompositionAPIUtils {

  private static readonly NULLIFIED_MARGIN_WIDTH = '0px';

  private static setSideButtonBordersCss(component: WorkshopComponent, cssToOverwrite: WorkshopComponentCss): void {
    const { buttonGroupSideBorders } = component.baseSubcomponent.customStaticFeatures || {};
    if (buttonGroupSideBorders) {
      if (buttonGroupSideBorders.left) {
        cssToOverwrite.borderLeftWidth = component.baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderTopWidth;
      } else if (buttonGroupSideBorders.right) {
        cssToOverwrite.borderRightWidth = component.baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderTopWidth;
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
    cssToOverwrite.marginTop = ButtonGroupCompositionAPIUtils.NULLIFIED_MARGIN_WIDTH;
    cssToOverwrite.marginBottom = ButtonGroupCompositionAPIUtils.NULLIFIED_MARGIN_WIDTH;
    cssToOverwrite.marginRight = ButtonGroupCompositionAPIUtils.NULLIFIED_MARGIN_WIDTH;
    ButtonGroupCompositionAPIUtils.setMarginLeft(borderWidthNumber, cssToOverwrite);
  }

  private static setSideBorders(borderWidthNumber: number, borderWidth: string, cssToOverwrite: WorkshopComponentCss): void {
    const newSideBorderWidth = borderWidthNumber > 2 ? '2px' : borderWidth;
    cssToOverwrite.borderLeftWidth = newSideBorderWidth;
    cssToOverwrite.borderRightWidth = newSideBorderWidth;
  }

  // WORK 2 - fix unsync
  // optimize - can use the approach to fix this to also deal with the issue of displaying component in front by having a temp overwritten css ref
  private static setBorderAndMarginCss(component: WorkshopComponent, cssToOverwrite: WorkshopComponentCss): void {
    const { borderWidth } = component.baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT];
    const borderWidthNumber = Number.parseFloat(borderWidth);
    ButtonGroupCompositionAPIUtils.setSideBorders(borderWidthNumber, borderWidth, cssToOverwrite);
    ButtonGroupCompositionAPIUtils.setMargin(borderWidthNumber, cssToOverwrite);
  }

  private static getParentLayerSiblingChildComponentsAutoSyncedObject(component: WorkshopComponent): SiblingChildComponentsAutoSynced {
    return component.parentLayer.subcomponent.seedComponent.sync.siblingChildComponentsAutoSynced;
  }

  private static canPropertiesBeOverwritten(component: WorkshopComponent): boolean {
    return !!SyncChildComponentUtils.getCurrentOrParentComponentThatIsInSync(component)
      // this is used to identify if the button has been temporarily synced during sync mode (as tempOriginalCustomProperties is only appended
      // to the one button group button that is currently selected) 
      || ButtonGroupCompositionAPIUtils.getParentLayerSiblingChildComponentsAutoSyncedObject(component).areChildrenComponentsTemporarilySynced;
  }

  private static getOverwrittenCss(subcomponent: Subcomponent, overwrittenCss: CustomCss): WorkshopComponentCss {
    if (!overwrittenCss) return;
    if (subcomponent.userSelectedPseudoClass !== CSS_PSEUDO_CLASSES.DEFAULT) {
      return overwrittenCss[subcomponent.userSelectedPseudoClass];
    }
    if (subcomponent.activeCssPseudoClass !== CSS_PSEUDO_CLASSES.DEFAULT) {
      return overwrittenCss[subcomponent.activeCssPseudoClass];
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
        // used for temp sync
        cssToOverwrite.boxShadow = '';
        ButtonGroupCompositionAPIUtils.setBorderAndMarginCss(component, cssToOverwrite);
      }
    }
    ButtonGroupCompositionAPIUtils.setSideButtonBordersCss(component, cssToOverwrite);
    return cssToOverwrite;
  }

  private static getBoxShadowValue(subcomponent: Subcomponent, activeCssPseudoClass: CSS_PSEUDO_CLASSES): string {
    return subcomponent.customCss[activeCssPseudoClass].boxShadow === CSS_PROPERTY_VALUES.INHERIT
      ? ComponentPreviewUtils.getInheritedCustomCssValue(activeCssPseudoClass, subcomponent.customCss, 'boxShadow')
      : subcomponent.customCss[activeCssPseudoClass].boxShadow;
  }

  private static setBoxShadowWithoutOffsetAndBlur(subcomponent: Subcomponent, activeCssPseudoClass: CSS_PSEUDO_CLASSES,
      newDefaultProperties: WorkshopComponentCss): void {
    const boxShadowPropertyVal = ButtonGroupCompositionAPIUtils.getBoxShadowValue(subcomponent, activeCssPseudoClass);
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
    const siblingChildComponentsAutoSynced = ButtonGroupCompositionAPIUtils.getParentLayerSiblingChildComponentsAutoSyncedObject(component);
    siblingChildComponentsAutoSynced.overwriteCssForSyncedComponent = overwriteCssForSyncedComponent;
  }
}

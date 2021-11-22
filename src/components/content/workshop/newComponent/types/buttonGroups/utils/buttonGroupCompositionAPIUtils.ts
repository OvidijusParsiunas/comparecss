import { SyncChildComponentUtils } from '../../../../toolbar/options/syncChildComponent/syncChildComponentUtils';
import { CustomCss, Subcomponent, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
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

  private static getInheritedShadowValue(subcomponent: Subcomponent, activeCssPseudoClass: CSS_PSEUDO_CLASSES): string {
    return subcomponent.customCss[activeCssPseudoClass].boxShadow === CSS_PROPERTY_VALUES.INHERIT
      ? ComponentPreviewUtils.getInheritedCustomCssValue(activeCssPseudoClass, subcomponent.customCss, 'boxShadow')
      : subcomponent.customCss[activeCssPseudoClass].boxShadow;
  }

  private static setBoxShadowWithoutOffsetAndBlur(subcomponent: Subcomponent, activeCssPseudoClass: CSS_PSEUDO_CLASSES,
      newDefaultProperties: WorkshopComponentCss, alreadyOverwrittenCustomCssObj: CustomCss): void {
    const boxShadowPropertyVal = alreadyOverwrittenCustomCssObj?.[CSS_PSEUDO_CLASSES.DEFAULT].boxShadow
      || ButtonGroupCompositionAPIUtils.getInheritedShadowValue(subcomponent, activeCssPseudoClass);
    if (boxShadowPropertyVal !== CSS_PROPERTY_VALUES.UNSET) {
      const boxShadowProps = boxShadowPropertyVal.split(' ');
      const shadowSpread = boxShadowProps[3];
      const shadowColor = boxShadowProps[4];
      newDefaultProperties.boxShadow = `0px 0px 0px ${shadowSpread} ${shadowColor}`;
    }
  }

  private static setShadowProperties(subcomponent: Subcomponent, activeCssPseudoClass: CSS_PSEUDO_CLASSES,
      newDefaultProperties: WorkshopComponentCss, alreadyOverwrittenCustomCssObj: CustomCss): void {
    // need the activeOverwrittenCustomCss check for time when the user hovers/clicks on a button as those will not set activeCssPseudoClass
    // to a new class
    if (activeCssPseudoClass !== CSS_PSEUDO_CLASSES.DEFAULT || alreadyOverwrittenCustomCssObj) {
      ButtonGroupCompositionAPIUtils.setBoxShadowWithoutOffsetAndBlur(subcomponent, activeCssPseudoClass, newDefaultProperties,
        alreadyOverwrittenCustomCssObj);
    } else if (activeCssPseudoClass === CSS_PSEUDO_CLASSES.DEFAULT) {
      newDefaultProperties.boxShadow = '';
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
  private static overwriteSyncComponentCss(component: WorkshopComponent, cssToOverwrite: WorkshopComponentCss): void {
    const { borderWidth } = component.baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT];
    const borderWidthNumber = Number.parseFloat(borderWidth);
    ButtonGroupCompositionAPIUtils.setSideBorders(borderWidthNumber, borderWidth, cssToOverwrite);
    ButtonGroupCompositionAPIUtils.setMargin(borderWidthNumber, cssToOverwrite);
  }

  private static canPropertiesBeOverwritten(component: WorkshopComponent): boolean {
    return !!SyncChildComponentUtils.getCurrentOrParentComponentThatIsInSync(component)
      // this is used to identify if the button has been temporarily synced during sync mode (as tempOriginalCustomProperties is only appended
      // to the one button group button that is currently selected) 
      || component.parentLayer.subcomponent.seedComponent.sync.siblingChildComponentsAutoSynced.areChildrenComponentsTemporarilySynced;
  }

  public static getButtonGroupCss(component: WorkshopComponent, alreadyOverwrittenCustomCssObj: CustomCss): WorkshopComponentCss {
    const cssToOverwrite: WorkshopComponentCss = {};
    if (ButtonGroupCompositionAPIUtils.canPropertiesBeOverwritten(component)) {
      ButtonGroupCompositionAPIUtils.overwriteSyncComponentCss(component, cssToOverwrite);
      ButtonGroupCompositionAPIUtils.setShadowProperties(component.baseSubcomponent,
        component.baseSubcomponent.activeCssPseudoClass, cssToOverwrite, alreadyOverwrittenCustomCssObj);
    }
    ButtonGroupCompositionAPIUtils.setSideButtonBordersCss(component, cssToOverwrite);
    return cssToOverwrite;
  }
}

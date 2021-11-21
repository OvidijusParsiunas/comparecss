import { SyncChildComponentUtils } from '../../../../toolbar/options/syncChildComponent/syncChildComponentUtils';
import { Subcomponent, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../../../../interfaces/workshopComponentCss';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';

export class ButtonGroupCompositionAPIUtils {

  private static readonly DEFAULT_SIDE_BORDER_WIDTH = '0px';
  private static readonly NULLIFIED_MARGIN_WIDTH = '0px';

  private static setBoxShadowWithoutOffsetAndBlur(subcomponent: Subcomponent, activeCssPseudoClass: CSS_PSEUDO_CLASSES, newDefaultProperties: WorkshopComponentCss): void {
    if (subcomponent.customCss[activeCssPseudoClass].boxShadow !== CSS_PROPERTY_VALUES.INHERIT) {
      const boxShadowProps = subcomponent.customCss[activeCssPseudoClass].boxShadow.split(' ');
      const shadowSpread = boxShadowProps[3];
      const shadowColor = boxShadowProps[4];
      newDefaultProperties.boxShadow = `0px 0px 0px ${shadowSpread} ${shadowColor}`;
    }
  }

  // WORK 2 - fix unsync
  public static setSyncedComponentShadowProperties(subcomponent: Subcomponent, activeCssPseudoClass: CSS_PSEUDO_CLASSES,
      newDefaultProperties: WorkshopComponentCss): void {
    if (SyncChildComponentUtils.getCurrentOrParentComponentThatIsInSync(subcomponent.seedComponent)) {
      if (activeCssPseudoClass === CSS_PSEUDO_CLASSES.DEFAULT) {
        newDefaultProperties.boxShadow = '';
      } else {
        ButtonGroupCompositionAPIUtils.setBoxShadowWithoutOffsetAndBlur(subcomponent, activeCssPseudoClass, newDefaultProperties);
      }
    }
  }

  private static setSideBordersCss(component: WorkshopComponent, overwrittenCss: WorkshopComponentCss): void {
    const { buttonGroupSideBorders } = component.baseSubcomponent.customStaticFeatures || {};
    if (buttonGroupSideBorders) {
      if (buttonGroupSideBorders.left) {
        overwrittenCss.borderLeftWidth = ButtonGroupCompositionAPIUtils.DEFAULT_SIDE_BORDER_WIDTH;
      } else if (buttonGroupSideBorders.right) {
        overwrittenCss.borderRightWidth = ButtonGroupCompositionAPIUtils.DEFAULT_SIDE_BORDER_WIDTH;
      }
    }
  }

  private static setMarginLeft(borderWidthNumber: number, overwrittenCss: WorkshopComponentCss): void {
    if (borderWidthNumber === 0) {
      overwrittenCss.marginLeft = '-2px';
    } else {
      const newBorderWidthNumber = borderWidthNumber > 2 ? 2 : borderWidthNumber;
      overwrittenCss.marginLeft = `-${newBorderWidthNumber}px`;
    }
  }

  private static setMargin(borderWidthNumber: number, overwrittenCss: WorkshopComponentCss): void {
    overwrittenCss.marginTop = ButtonGroupCompositionAPIUtils.NULLIFIED_MARGIN_WIDTH;
    overwrittenCss.marginBottom = ButtonGroupCompositionAPIUtils.NULLIFIED_MARGIN_WIDTH;
    overwrittenCss.marginRight = ButtonGroupCompositionAPIUtils.NULLIFIED_MARGIN_WIDTH;
    ButtonGroupCompositionAPIUtils.setMarginLeft(borderWidthNumber, overwrittenCss);
  }

  private static setSideBorders(borderWidthNumber: number, borderWidth: string, overwrittenCss: WorkshopComponentCss): void {
    const newSideBorderWidth = borderWidthNumber > 2 ? '2px' : borderWidth;
    overwrittenCss.borderLeftWidth = newSideBorderWidth;
    overwrittenCss.borderRightWidth = newSideBorderWidth;
  }

  // WORK 2 - fix unsync
  private static overwriteSyncComponentCss(component: WorkshopComponent, overwrittenCss: WorkshopComponentCss): void {
    const { borderWidth } = component.baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT];
    const borderWidthNumber = Number.parseFloat(borderWidth);
    ButtonGroupCompositionAPIUtils.setSideBorders(borderWidthNumber, borderWidth, overwrittenCss);
    ButtonGroupCompositionAPIUtils.setMargin(borderWidthNumber, overwrittenCss);
  }

  public static getButtonGroupCss(component: WorkshopComponent): WorkshopComponentCss {
    const overwrittenCss: WorkshopComponentCss = {};
    if (SyncChildComponentUtils.getCurrentOrParentComponentThatIsInSync(component)) {
      ButtonGroupCompositionAPIUtils.overwriteSyncComponentCss(component, overwrittenCss);
    }
    ButtonGroupCompositionAPIUtils.setSideBordersCss(component, overwrittenCss);
    return overwrittenCss;
  }
}

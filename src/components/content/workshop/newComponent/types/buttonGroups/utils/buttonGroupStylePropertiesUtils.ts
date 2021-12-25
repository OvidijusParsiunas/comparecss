import { BORDER_WIDTH_CSS_PROPERTY_ALIAS } from '../../../../../../../consts/borderWidthAlias';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../../../../interfaces/workshopComponentCss';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';

export class ButtonGroupStylePropertiesUtils {

  private static readonly ZERO_PIXELS = '0px';

  public static setButtonGroupHeightViaButtonProperties(buttonComponent: WorkshopComponent, buttonGroupComponent: WorkshopComponent): void {
    const defaultCustomCss = buttonComponent.baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT];
    const height = Number.parseFloat(defaultCustomCss.height);
    const paddingTop = Number.parseFloat(defaultCustomCss.paddingTop);
    const paddingBottom = Number.parseFloat(defaultCustomCss.paddingBottom);
    const borderTopWidth = Number.parseFloat(defaultCustomCss.borderTopWidth);
    const totalHeight = height + paddingTop + paddingBottom + (borderTopWidth * 2);
    buttonGroupComponent.baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].height = `${totalHeight}px`;
  }

  public static setButtonGroupBorderRadiusViaButtonProperties(buttonComponent: WorkshopComponent, buttonGroupComponent: WorkshopComponent): void {
    buttonGroupComponent.baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderRadius = buttonComponent
      .baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderRadius;
  }

  private static setMargin(cssToOverwrite: WorkshopComponentCss): void {
    cssToOverwrite.marginTop = ButtonGroupStylePropertiesUtils.ZERO_PIXELS;
    cssToOverwrite.marginBottom = ButtonGroupStylePropertiesUtils.ZERO_PIXELS;
    cssToOverwrite.marginRight = ButtonGroupStylePropertiesUtils.ZERO_PIXELS;
    cssToOverwrite.marginLeft = ButtonGroupStylePropertiesUtils.ZERO_PIXELS;
  }

  private static setSideBorders(component: WorkshopComponent, cssToOverwrite: WorkshopComponentCss): void {
    const borderWidth = component.baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT][BORDER_WIDTH_CSS_PROPERTY_ALIAS];
    const borderWidthNumber = Number.parseFloat(borderWidth);
    const newSideBorderWidth = borderWidthNumber > 2 ? '2px' : borderWidth;
    cssToOverwrite.borderLeftWidth = newSideBorderWidth;
    cssToOverwrite.borderRightWidth = newSideBorderWidth;
  }

  public static setBorderAndMarginCss(component: WorkshopComponent, cssToOverwrite: WorkshopComponentCss): void {
    ButtonGroupStylePropertiesUtils.setSideBorders(component, cssToOverwrite);
    ButtonGroupStylePropertiesUtils.setMargin(cssToOverwrite);
  }
}

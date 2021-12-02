import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';

export class ButtonGroupStylePropertiesUtils {

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
}

import { CSS_PSEUDO_CLASSES } from "../../../../../../../consts/subcomponentCssClasses.enum";
import { WorkshopComponent } from "../../../../../../../interfaces/workshopComponent";

export class ButtonGroupHeightUtils {

  public static setButtonGroupHeightViaButtonProperties(buttonComponent: WorkshopComponent, buttonGroupComponent: WorkshopComponent): void {
    const buttonBaseSubcomponent = buttonComponent.baseSubcomponent;
    const height = Number.parseFloat(buttonBaseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].height);
    const paddingTop = Number.parseFloat(buttonBaseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].paddingTop);
    const paddingBottom = Number.parseFloat(buttonBaseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].paddingBottom);
    const totalHeight = height + paddingTop + paddingBottom;
    buttonGroupComponent.baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].height = `${totalHeight}px`;
  }
}

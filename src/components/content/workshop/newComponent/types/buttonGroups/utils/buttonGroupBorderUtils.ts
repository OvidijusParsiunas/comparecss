import { BUTTON_GROUP_BUTTON_CLASSES } from '../../../../../../../consts/buttonGroupButtonClasses.enum';
import { ButtonGroupButtonSpecificSettings } from '../settings/buttonGroupButtonSpecificSettings';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ButtonGroupGenericUtils } from './buttonGroupGenericUtils';

export class ButtonGroupBorderUtils {

  private static readonly DEFAULT_BORDER_WIDTH = '0px';
  private static readonly DEFAULT_MARGIN_LEFT = '-2px';

  public static setBorderClasses(buttonComponent: WorkshopComponent, buttonGroupComponent: WorkshopComponent): void {
    // WORK 2 - refactor
    const buttons = ButtonGroupGenericUtils.getAllButtonComponents(buttonGroupComponent);
    const sharedComponentClasses = [BUTTON_GROUP_BUTTON_CLASSES.BUTTON_GROUP_BUTTON];
    buttons[0].componentClasses = [
      ...sharedComponentClasses, BUTTON_GROUP_BUTTON_CLASSES.BUTTON_GROUP_LEFT_BUTTON];
    buttons[buttons.length - 1].componentClasses = [
      ...sharedComponentClasses, BUTTON_GROUP_BUTTON_CLASSES.BUTTON_GROUP_RIGHT_BUTTON];
    const middleButtonComponentClasses = [
      ...sharedComponentClasses, BUTTON_GROUP_BUTTON_CLASSES.BUTTON_GROUP_MIDDLE_BUTTON]
    for (let i = 1; i < buttons.length - 1; i += 1) {
      buttons[i].componentClasses = middleButtonComponentClasses;
      delete buttons[i].baseSubcomponent.customStaticFeatures;
    }

    buttons[0].baseSubcomponent.customStaticFeatures = {
      buttonGroupSideBorders: {
        left: true,
      }
    }
    buttons[buttons.length - 1].baseSubcomponent.customStaticFeatures = {
      buttonGroupSideBorders: {
        right: true,
      }
    }
  }

  public static setDefaultBorderProperties(buttonComponent: WorkshopComponent): void {
    const { customCss } = buttonComponent.baseSubcomponent;
    customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderLeftWidth = ButtonGroupBorderUtils.DEFAULT_BORDER_WIDTH;
    customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderRightWidth = ButtonGroupBorderUtils.DEFAULT_BORDER_WIDTH;
    customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderTopWidth = ButtonGroupBorderUtils.DEFAULT_BORDER_WIDTH;
    customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderBottomWidth = ButtonGroupBorderUtils.DEFAULT_BORDER_WIDTH;
    customCss[CSS_PSEUDO_CLASSES.DEFAULT].marginLeft = ButtonGroupBorderUtils.DEFAULT_MARGIN_LEFT;
    ButtonGroupButtonSpecificSettings.set(buttonComponent);
  }
}

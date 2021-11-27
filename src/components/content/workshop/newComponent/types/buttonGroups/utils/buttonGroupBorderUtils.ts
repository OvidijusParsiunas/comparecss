import { BUTTON_GROUP_BUTTON_CLASSES } from '../../../../../../../consts/buttonGroupButtonClasses.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ButtonGroupGenericUtils } from './buttonGroupGenericUtils';
import { ComponentBuilder } from '../../shared/componentBuilder';

export class ButtonGroupBorderUtils extends ComponentBuilder {

  private static setMiddleButtonsProperties(buttons: WorkshopComponent[], sharedComponentClasses: BUTTON_GROUP_BUTTON_CLASSES[]): void {
    const middleButtonComponentClasses = [...sharedComponentClasses, BUTTON_GROUP_BUTTON_CLASSES.BUTTON_GROUP_MIDDLE_BUTTON];
    for (let i = 1; i < buttons.length - 1; i += 1) {
      buttons[i].componentClasses = middleButtonComponentClasses;
      delete buttons[i].baseSubcomponent.customStaticFeatures.buttonGroupSideBorders;
    }
  }

  private static setSideButtonsProperties(buttons: WorkshopComponent[], sharedComponentClasses: BUTTON_GROUP_BUTTON_CLASSES[]): void {
    buttons[0].baseSubcomponent.customStaticFeatures.buttonGroupSideBorders = { left: true };
    buttons[0].componentClasses = [...sharedComponentClasses, BUTTON_GROUP_BUTTON_CLASSES.BUTTON_GROUP_LEFT_BUTTON];
    buttons[buttons.length - 1].baseSubcomponent.customStaticFeatures.buttonGroupSideBorders = { right: true };
    buttons[buttons.length - 1].componentClasses = [...sharedComponentClasses, BUTTON_GROUP_BUTTON_CLASSES.BUTTON_GROUP_RIGHT_BUTTON];
  }

  private static setMultipleButtonsBorderProperties(buttons: WorkshopComponent[]): void {
    const sharedComponentClasses = [BUTTON_GROUP_BUTTON_CLASSES.BUTTON_GROUP_BUTTON];
    ButtonGroupBorderUtils.setSideButtonsProperties(buttons, sharedComponentClasses);
    ButtonGroupBorderUtils.setMiddleButtonsProperties(buttons, sharedComponentClasses);
  }

  private static setSingleButtonBorderProperties(buttonComponent: WorkshopComponent): void {
    buttonComponent.baseSubcomponent.customStaticFeatures.buttonGroupSideBorders = {
      left: true,
      right: true,
    };
    buttonComponent.componentClasses = [];
  }

  // buttonComponent can contain the button that was removed
  public static setBorderProperties(buttonComponent: WorkshopComponent, buttonGroupComponent: WorkshopComponent): void {
    const buttons = ButtonGroupGenericUtils.getAllButtonComponents(buttonGroupComponent);
    if (buttons.length === 1) {
      ButtonGroupBorderUtils.setSingleButtonBorderProperties(buttons[0]);
    } else {
      ButtonGroupBorderUtils.setMultipleButtonsBorderProperties(buttons);
    }
  }
}

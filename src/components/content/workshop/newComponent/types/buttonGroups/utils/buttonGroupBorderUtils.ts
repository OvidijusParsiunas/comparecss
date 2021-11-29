import { BUTTON_GROUP_BUTTON_POSITION_TYPES } from '../../../../../../../consts/buttonGroupSideBorders.enum';
import { BUTTON_GROUP_BUTTON_CLASSES } from '../../../../../../../consts/buttonGroupButtonClasses.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ButtonGroupGenericUtils } from './buttonGroupGenericUtils';
import { ComponentBuilder } from '../../shared/componentBuilder';

export class ButtonGroupBorderUtils extends ComponentBuilder {

  private static setMiddleButtonsProperties(buttons: WorkshopComponent[]): void {
    for (let i = 1; i < buttons.length - 1; i += 1) {
      const button = buttons[i];
      button.componentClasses = [BUTTON_GROUP_BUTTON_CLASSES.BUTTON_GROUP_MIDDLE_BUTTON];
      button.baseSubcomponent.customStaticFeatures.buttonGroupButtonPositionType = BUTTON_GROUP_BUTTON_POSITION_TYPES.MIDDLE;
    }
  }

  private static setSideButtonsProperties(buttons: WorkshopComponent[]): void {
    const leftButton = buttons[0];
    leftButton.baseSubcomponent.customStaticFeatures.buttonGroupButtonPositionType = BUTTON_GROUP_BUTTON_POSITION_TYPES.LEFT;
    leftButton.componentClasses = [BUTTON_GROUP_BUTTON_CLASSES.BUTTON_GROUP_LEFT_BUTTON];
    const rightButton = buttons[buttons.length - 1];
    rightButton.baseSubcomponent.customStaticFeatures.buttonGroupButtonPositionType = BUTTON_GROUP_BUTTON_POSITION_TYPES.RIGHT;
    rightButton.componentClasses = [BUTTON_GROUP_BUTTON_CLASSES.BUTTON_GROUP_RIGHT_BUTTON];
  }

  private static setMultipleButtonsBorderProperties(buttons: WorkshopComponent[]): void {
    ButtonGroupBorderUtils.setSideButtonsProperties(buttons);
    ButtonGroupBorderUtils.setMiddleButtonsProperties(buttons);
  }

  private static setSingleButtonBorderProperties(buttonComponent: WorkshopComponent): void {
    buttonComponent.baseSubcomponent.customStaticFeatures.buttonGroupButtonPositionType = BUTTON_GROUP_BUTTON_POSITION_TYPES.SINGLE;
    buttonComponent.componentClasses = [];
  }

  // buttonComponent can reference the button that was removed
  public static setBorderProperties(buttonComponent: WorkshopComponent, buttonGroupComponent: WorkshopComponent): void {
    const buttons = ButtonGroupGenericUtils.getAllButtonComponents(buttonGroupComponent);
    if (buttons.length === 1) {
      ButtonGroupBorderUtils.setSingleButtonBorderProperties(buttons[0]);
    } else {
      ButtonGroupBorderUtils.setMultipleButtonsBorderProperties(buttons);
    }
  }
}

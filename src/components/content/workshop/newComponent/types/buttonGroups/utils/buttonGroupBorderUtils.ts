import { BUTTON_GROUP_BUTTON_CONTAINER_CLASSES } from '../../../../../../../consts/buttonGroupButtonContainerClasses.enum';
import { BUTTON_GROUP_BUTTON_CLASSES } from '../../../../../../../consts/buttonGroupButtonClasses.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ButtonGroupGenericUtils } from './buttonGroupGenericUtils';
import { ComponentBuilder } from '../../shared/componentBuilder';

export class ButtonGroupBorderUtils extends ComponentBuilder {

  private static setMiddleButtonsProperties(buttons: WorkshopComponent[]): void {
    for (let i = 1; i < buttons.length - 1; i += 1) {
      const button = buttons[i];
      button.cssClasses.componentClasses = new Set([BUTTON_GROUP_BUTTON_CLASSES.BUTTON_GROUP_MIDDLE_BUTTON]);
      button.cssClasses.containerClasses = new Set([BUTTON_GROUP_BUTTON_CONTAINER_CLASSES.BUTTON_GROUP_MIDDLE_BUTTON_CONTAINER]);
    }
  }

  private static setSideButtonsProperties(buttons: WorkshopComponent[]): void {
    const leftButton = buttons[0];
    leftButton.cssClasses.componentClasses = new Set([BUTTON_GROUP_BUTTON_CLASSES.BUTTON_GROUP_LEFT_BUTTON]);
    leftButton.cssClasses.containerClasses = new Set([BUTTON_GROUP_BUTTON_CONTAINER_CLASSES.BUTTON_GROUP_LEFT_BUTTON_CONTAINER]);
    const rightButton = buttons[buttons.length - 1];
    rightButton.cssClasses.componentClasses = new Set([BUTTON_GROUP_BUTTON_CLASSES.BUTTON_GROUP_RIGHT_BUTTON]);
    rightButton.cssClasses.containerClasses = new Set([BUTTON_GROUP_BUTTON_CONTAINER_CLASSES.BUTTON_GROUP_RIGHT_BUTTON_CONTAINER]);
  }

  private static setMultipleButtonsBorderProperties(buttons: WorkshopComponent[]): void {
    ButtonGroupBorderUtils.setSideButtonsProperties(buttons);
    ButtonGroupBorderUtils.setMiddleButtonsProperties(buttons);
  }

  private static setSingleButtonBorderProperties(buttonComponent: WorkshopComponent): void {
    buttonComponent.cssClasses.componentClasses = new Set([BUTTON_GROUP_BUTTON_CLASSES.BUTTON_GROUP_SINGLE_BUTTON]);
    buttonComponent.cssClasses.containerClasses?.clear();
  }

  // buttonComponent can reference the button that was removed
  public static setBorderProperties(buttonComponent: WorkshopComponent, buttonGroupComponent: WorkshopComponent): void {
    const buttons = ButtonGroupGenericUtils.getAllButtonComponents(buttonGroupComponent);
    buttonComponent.cssClasses = {};
    if (buttons.length === 1) {
      ButtonGroupBorderUtils.setSingleButtonBorderProperties(buttons[0]);
    } else {
      ButtonGroupBorderUtils.setMultipleButtonsBorderProperties(buttons);
    }
  }
}

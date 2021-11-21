import { BUTTON_GROUP_BUTTON_CLASSES } from '../../../../../../../consts/buttonGroupButtonClasses.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ButtonGroupGenericUtils } from './buttonGroupGenericUtils';
import { ComponentBuilder } from '../../shared/componentBuilder';

export class ButtonGroupBorderUtils extends ComponentBuilder {

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
      delete buttons[i].baseSubcomponent.customStaticFeatures.buttonGroupSideBorders;
    }
    buttons[0].baseSubcomponent.customStaticFeatures.buttonGroupSideBorders = {
      left: true,
    };
    buttons[buttons.length - 1].baseSubcomponent.customStaticFeatures.buttonGroupSideBorders = {
      right: true,
    };
  }
}

import { BUTTON_GROUP_BUTTON_CLASSES } from '../../../../../../../consts/buttonGroupButtonClasses.enum';
import { CustomCss, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { BORDER_STYLES } from '../../../../../../../consts/borderStyles.enum';
import { ButtonGroupGenericUtils } from './buttonGroupGenericUtils';

export class ButtonGroupBorderUtils {
  
  public static setBorderClasses(buttonComponent: WorkshopComponent, buttonGroupComponent: WorkshopComponent): void {
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
    }
  }

  private static setBorderPropertyValues(customCss: CustomCss, borderWidthKey: string,
      borderColorKey: string, borderStyleKey: string): void {
    customCss[CSS_PSEUDO_CLASSES.DEFAULT][borderWidthKey] = '0px';
    customCss[CSS_PSEUDO_CLASSES.DEFAULT][borderColorKey] = '#1779ba';
    customCss[CSS_PSEUDO_CLASSES.DEFAULT][borderStyleKey] = BORDER_STYLES.SOLID;
  }

  public static setDefaultBorderProperties(buttonComponent: WorkshopComponent): void {
    const { customCss } = buttonComponent.baseSubcomponent;
    ButtonGroupBorderUtils.setBorderPropertyValues(customCss, 'borderLeftWidth', 'borderLeftColor', 'borderLeftStyle');
    ButtonGroupBorderUtils.setBorderPropertyValues(customCss, 'borderRightWidth', 'borderRightColor', 'borderRightStyle');
  }
}

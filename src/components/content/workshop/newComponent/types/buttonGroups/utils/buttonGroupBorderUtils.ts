import { BUTTON_GROUP_BUTTON_CLASSES } from '../../../../../../../consts/buttonGroupButtonClasses.enum';
import { ButtonGroupButtonSpecificSettings } from '../settings/buttonGroupButtonSpecificSettings';
import { CustomCss, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import BoxShadowUtils from '../../../../toolbar/settings/utils/boxShadowUtils';
import { ButtonGroupGenericUtils } from './buttonGroupGenericUtils';

export class ButtonGroupBorderUtils {

  private static readonly DEFAULT_BORDER_WIDTH = '0px';
  private static readonly DEFAULT_MARGIN_LEFT = '-2px';
  private static readonly ACTIVE_PSEUDO_CLASS_BORDER_COLOR = CSS_PROPERTY_VALUES.INHERIT;

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

  private static setCustomCss(customCss: CustomCss): void {
    customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderLeftWidth = ButtonGroupBorderUtils.DEFAULT_BORDER_WIDTH;
    customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderRightWidth = ButtonGroupBorderUtils.DEFAULT_BORDER_WIDTH;
    customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderTopWidth = ButtonGroupBorderUtils.DEFAULT_BORDER_WIDTH;
    customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderBottomWidth = ButtonGroupBorderUtils.DEFAULT_BORDER_WIDTH;
    customCss[CSS_PSEUDO_CLASSES.DEFAULT].marginLeft = ButtonGroupBorderUtils.DEFAULT_MARGIN_LEFT;
    customCss[CSS_PSEUDO_CLASSES.HOVER].borderColor = ButtonGroupBorderUtils.ACTIVE_PSEUDO_CLASS_BORDER_COLOR;
    customCss[CSS_PSEUDO_CLASSES.CLICK].borderColor = ButtonGroupBorderUtils.ACTIVE_PSEUDO_CLASS_BORDER_COLOR;
    // WORK 4 - move out
    customCss[CSS_PSEUDO_CLASSES.HOVER].boxShadow = BoxShadowUtils.DEFAULT_BOX_SHADOW_PIXEL_VALUES;
    customCss[CSS_PSEUDO_CLASSES.CLICK].boxShadow = ButtonGroupBorderUtils.ACTIVE_PSEUDO_CLASS_BORDER_COLOR;
  }

  public static setDefaultBorderProperties(buttonComponent: WorkshopComponent): void {
    const { customCss, defaultCss } = buttonComponent.baseSubcomponent;
    ButtonGroupBorderUtils.setCustomCss(customCss);
    ButtonGroupBorderUtils.setCustomCss(defaultCss);
    ButtonGroupButtonSpecificSettings.set(buttonComponent);
  }
}

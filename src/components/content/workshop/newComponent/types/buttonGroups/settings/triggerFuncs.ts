import { Subcomponent, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { ButtonGroupStylePropertiesUtils } from '../utils/buttonGroupStylePropertiesUtils';
import { SETTINGS_TYPES } from '../../../../../../../consts/settingsTypes.enum';

export class TriggerFuncs {

  private static setWidthViaRange(buttonBaseSubcomponent: Subcomponent, cssProperty: string): void {
    if (cssProperty === 'height' || cssProperty === 'paddingTop' || cssProperty === 'paddingBottom') {
      ButtonGroupStylePropertiesUtils.setButtonGroupHeightViaButtonProperties(buttonBaseSubcomponent.seedComponent,
        buttonBaseSubcomponent.seedComponent.containerComponent);
    } else if (cssProperty === 'borderRightWidth') {
      const { borderRightWidth } = buttonBaseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT];
      buttonBaseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderLeftWidth = borderRightWidth;
    } else if (cssProperty === 'borderTopWidth') {
      const { borderTopWidth } = buttonBaseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT];
      buttonBaseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderBottomWidth = borderTopWidth;
      const buttonComponent = buttonBaseSubcomponent.seedComponent;
      ButtonGroupStylePropertiesUtils.setButtonGroupHeightViaButtonProperties(buttonComponent, buttonComponent.containerComponent);
    } else if (cssProperty === 'borderRadius') {
      const { borderRadius } = buttonBaseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT];
      // this is used to get a curve for the button group base
      buttonBaseSubcomponent.seedComponent.containerComponent.baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderRadius = borderRadius;
    }
  }

  public static setTriggerFuncOnButtonSettingChange(buttonComponent: WorkshopComponent): void {
    buttonComponent.triggerFuncOnSettingChange = {
      [SETTINGS_TYPES.RANGE]: TriggerFuncs.setWidthViaRange,
    };
  }
}

import { Subcomponent, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { DropdownMenuAutoWidthUtils } from '../utils/dropdownMenuAutoWidthUtils';
import { SETTINGS_TYPES } from '../../../../../../../consts/settingsTypes.enum';

export class TriggerFuncs {

  private static setWidthViaRange(subcomponent: Subcomponent, cssProperty: string): void {
    if (cssProperty === 'fontSize' || cssProperty === 'marginLeft' || cssProperty === 'marginRight' || cssProperty === 'width') {
      const buttonComponent = subcomponent.seedComponent.containerComponent;
      const menuComponent = buttonComponent.linkedComponents.auxiliary[0];
      DropdownMenuAutoWidthUtils.setButtonWidth(buttonComponent, menuComponent); 
    }
  }

  public static setTriggerFuncOnButtonTextSettingChange(buttonBaseComponent: WorkshopComponent): void {
    buttonBaseComponent.triggerFuncOnSettingChange = {
      [SETTINGS_TYPES.RANGE]: TriggerFuncs.setWidthViaRange,
    };
  }

  private static setMenuWidthViaMenuItemOrTextChange(textSubcomponent: Subcomponent): void {
    const menuComponent = textSubcomponent.seedComponent.containerComponent || textSubcomponent.seedComponent;
    DropdownMenuAutoWidthUtils.setMenuWidth(menuComponent);
  }

  private static setWidthForText(textSubcomponnet: Subcomponent, cssProperty: string): void {
    if (cssProperty === 'fontSize' || cssProperty === 'fontWeight') {
      TriggerFuncs.setMenuWidthViaMenuItemOrTextChange(textSubcomponnet);
    }
  }

  private static setDropdownButtonAndMenuWidthsViaItemTextContentChange(itemSubcomponent: Subcomponent): void {
    const menuComponent = itemSubcomponent.seedComponent.containerComponent;
    DropdownMenuAutoWidthUtils.setMenuWidth(menuComponent);
    DropdownMenuAutoWidthUtils.setButtonWidth(menuComponent.linkedComponents.base, menuComponent);
  }

  private static setTriggerFuncOnItemTextSettingChange(textComponent: WorkshopComponent): void {
    textComponent.triggerFuncOnSettingChange = {
      [SETTINGS_TYPES.INPUT]: TriggerFuncs.setDropdownButtonAndMenuWidthsViaItemTextContentChange,
      [SETTINGS_TYPES.RANGE]: TriggerFuncs.setWidthForText,
      [SETTINGS_TYPES.ACTIONS_DROPDOWN]: TriggerFuncs.setWidthForText,
    };
  }

  private static setItemWidthViaRange(itemSubcomponent: Subcomponent, cssProperty: string): void {
    if (cssProperty === 'paddingLeft' || cssProperty === 'paddingRight') {
      TriggerFuncs.setMenuWidthViaMenuItemOrTextChange(itemSubcomponent);
    }
  }

  private static setTriggerFuncOnItemSettingChange(itemComponent: WorkshopComponent): void {
    itemComponent.triggerFuncOnSettingChange = {
      [SETTINGS_TYPES.RANGE]: TriggerFuncs.setItemWidthViaRange,
    };
  }

  public static setTriggerFuncForItemSettingChanges(itemComponent: WorkshopComponent): void {
    TriggerFuncs.setTriggerFuncOnItemSettingChange(itemComponent);
    TriggerFuncs.setTriggerFuncOnItemTextSettingChange(itemComponent.childComponentsLockedToThis[0]);
  }
}

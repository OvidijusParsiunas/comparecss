import { CHANGE_COMPONENT_ORDER_DIRECTIONS } from '../../../../../../../interfaces/changeComponentOrderDirections.enum';
import { ChangeChildComponentOrderEvent } from '../../../../../../../interfaces/settingsComponentEvents';
import { DropdownUtils } from '../../../../utils/componentManipulation/utils/dropdownUtils';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SETTINGS_TYPES } from '../../../../../../../consts/settingsTypes.enum';
import { SETTING_NAMES } from '../../../../../../../consts/settingNames.enum';
import { ComponentOptions } from '@vue/runtime-core';

export class ChildComponentOrderSetting {

  private static changeChildComponentOrder(settingsComponent: ComponentOptions, direction: CHANGE_COMPONENT_ORDER_DIRECTIONS, masterComponent: WorkshopComponent): void {
    settingsComponent.$emit('change-child-component-order', [direction, masterComponent] as ChangeChildComponentOrderEvent);
  }

  // create an optional interface
  public static get(orderDirections: CHANGE_COMPONENT_ORDER_DIRECTIONS[]): any {
    return { 
      type: SETTINGS_TYPES.BUTTONS,
      spec: {
        name: SETTING_NAMES.ORDER,
        options: DropdownUtils.generateDropdownStructure(orderDirections),
        itemAction: ChildComponentOrderSetting.changeChildComponentOrder,
      },
    };
  }
}

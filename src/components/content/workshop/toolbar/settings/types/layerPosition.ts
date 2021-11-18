import { CHANGE_COMPONENT_ORDER_DIRECTIONS } from '../../../../../../interfaces/changeComponentOrderDirections.enum';
import { ChangeChildComponentOrderEvent } from '../../../../../../interfaces/settingsComponentEvents';
import { DropdownUtils } from '../../../utils/componentManipulation/utils/dropdownUtils';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';
import { SETTING_NAMES } from '../../../../../../consts/settingNames.enum';
import { ComponentOptions } from 'vue';

function changeChildComponentOrder(settingsComponent: ComponentOptions, direction: CHANGE_COMPONENT_ORDER_DIRECTIONS, masterComponent: WorkshopComponent): void {
  settingsComponent.$emit('change-child-component-order', [direction, masterComponent] as ChangeChildComponentOrderEvent);
}

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.BUTTONS,
      spec: {
        name: SETTING_NAMES.ORDER,
        options: DropdownUtils.generateDropdownStructure([CHANGE_COMPONENT_ORDER_DIRECTIONS.UP, CHANGE_COMPONENT_ORDER_DIRECTIONS.DOWN]),
        itemAction: changeChildComponentOrder,
      },
    },
  ]
};

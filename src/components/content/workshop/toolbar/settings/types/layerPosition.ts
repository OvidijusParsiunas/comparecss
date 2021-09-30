import { SUBCOMPONENT_ORDER_DIRECTIONS } from '../../../../../../interfaces/subcomponentOrderDirections.enum';
import { ChangeSubcomponentOrderEvent } from '../../../../../../interfaces/settingsComponentEvents';
import { DropdownUtils } from '../../../utils/componentManipulation/utils/dropdownUtils';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';
import { SETTING_NAMES } from '../../../../../../consts/settingNames.enum';
import { ComponentOptions } from 'vue';

function changeSubcomponentOrder(settingsComponent: ComponentOptions, direction: SUBCOMPONENT_ORDER_DIRECTIONS, masterComponent: WorkshopComponent): void {
  settingsComponent.$emit('change-subcomponent-order', [direction, masterComponent] as ChangeSubcomponentOrderEvent);
}

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.BUTTONS,
      spec: {
        name: SETTING_NAMES.ORDER,
        options: DropdownUtils.generateDropdownStructure([SUBCOMPONENT_ORDER_DIRECTIONS.UP, SUBCOMPONENT_ORDER_DIRECTIONS.DOWN]),
        itemAction: changeSubcomponentOrder,
      },
    },
  ]
};

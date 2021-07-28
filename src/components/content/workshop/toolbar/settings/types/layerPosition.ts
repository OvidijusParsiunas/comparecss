import { UpdateDropdownOptionNamesShared } from '../../../utils/componentManipulation/updateNestedComponentNames/updateDropdownOptionNamesShared';
import { SUBCOMPONENT_ORDER_DIRECTIONS } from '../../../../../../interfaces/subcomponentOrderDirections.enum';
import { ChangeSubcomponentOrderEvent } from '../../../../../../interfaces/settingsComponentEvents';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';
import { ComponentOptions } from 'vue';

function changeSubcomponentOrder(settingsComponent: ComponentOptions, direction: SUBCOMPONENT_ORDER_DIRECTIONS, parentComponent: WorkshopComponent): void {
  settingsComponent.$emit('change-subcomponent-order', [direction, parentComponent] as ChangeSubcomponentOrderEvent);
}

// create an optional interface
export default {
  options: [
    { 
      type: SETTINGS_TYPES.BUTTONS,
      spec: {
        name: 'Order',
        options: UpdateDropdownOptionNamesShared.generateNestedDropdownStructure([SUBCOMPONENT_ORDER_DIRECTIONS.UP, SUBCOMPONENT_ORDER_DIRECTIONS.DOWN]),
        optionAction: changeSubcomponentOrder,
      },
    },
  ]
};

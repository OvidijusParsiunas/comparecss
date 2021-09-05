import { UpdateDropdownOptionNamesShared } from '../../../utils/componentManipulation/updateChildComponent/updateDropdownOptionNamesShared';
import { ActionsDropdownMouseEventCallbacks } from '../../../../../../interfaces/actionsDropdownsMouseEventCallbacks';
import { MenuPositionAlignment } from '../../../newComponent/types/dropdowns/settings/menuPositionAlignment';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

function generateMouseEventCallbacks(): ActionsDropdownMouseEventCallbacks {
  return {
    mouseClickOptionCallback: MenuPositionAlignment.change,
    mouseEnterOptionCallback: MenuPositionAlignment.change,
    mouseLeaveDropdownCallback: MenuPositionAlignment.change,
  };
}

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.ACTIONS_DROPDOWN,
      spec: {
        name: 'Alignment',
        options: UpdateDropdownOptionNamesShared.generateDropdownStructure(['Above', 'Below']),
        activeOptionPropertyKeyName: 'position',
        customFeatureObjectKeys: ['customStaticFeatures', 'dropdownAlignment', 'position'],
        ...generateMouseEventCallbacks(),
      },
    },
  ]
};

import { ActionsDropdownMouseEventCallbacks } from '../../../../../../interfaces/actionsDropdownsMouseEventCallbacks';
import { MenuIndexAlignment } from '../../../newComponent/types/dropdowns/settings/menuIndexAlignment';
import { DROPDOWN_MENU_POSITIONS } from '../../../../../../consts/dropdownMenuPositions.enum';
import { DropdownUtils } from '../../../utils/componentManipulation/utils/dropdownUtils';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

function generateMouseEventCallbacks(): ActionsDropdownMouseEventCallbacks {
  return {
    mouseClickOptionCallback: MenuIndexAlignment.change,
    mouseEnterOptionCallback: MenuIndexAlignment.change,
    mouseLeaveDropdownCallback: MenuIndexAlignment.change,
  };
}

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.ACTIONS_DROPDOWN,
      spec: {
        name: 'Position',
        options: DropdownUtils.generateDropdownStructure(Object.values(DROPDOWN_MENU_POSITIONS)),
        activeOptionPropertyKeyName: 'position',
        customFeatureObjectKeys: ['customFeatures', 'dropdown', 'menuPosition', 'position'],
      },
    },
    {
      type: SETTINGS_TYPES.ACTIONS_DROPDOWN,
      spec: {
        name: 'Alignment',
        options: DropdownUtils.generateDropdownStructure(['Above', 'Below']),
        activeOptionPropertyKeyName: 'indexAlignment',
        customFeatureObjectKeys: ['customFeatures', 'dropdown', 'indexAlignment'],
        ...generateMouseEventCallbacks(),
      },
    },
  ]
};

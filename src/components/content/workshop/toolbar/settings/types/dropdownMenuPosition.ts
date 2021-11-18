import { ActionsDropdownMouseEventCallbacks } from '../../../../../../interfaces/actionsDropdownsMouseEventCallbacks';
import { MenuZIndexAlignment } from '../../../newComponent/types/dropdowns/settings/menuZIndexAlignment';
import { DROPDOWN_MENU_POSITIONS } from '../../../../../../consts/dropdownMenuPositions.enum';
import { DropdownUtils } from '../../../utils/componentManipulation/utils/dropdownUtils';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

function generateMouseEventCallbacks(): ActionsDropdownMouseEventCallbacks {
  return {
    mouseClickItemCallback: MenuZIndexAlignment.change,
    mouseEnterItemCallback: MenuZIndexAlignment.change,
    mouseLeaveDropdownCallback: MenuZIndexAlignment.change,
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
        activeItemPropertyKeyName: 'position',
        customFeatureObjectKeys: ['customFeatures', 'dropdown', 'menuPosition', 'position'],
      },
    },
    {
      type: SETTINGS_TYPES.ACTIONS_DROPDOWN,
      spec: {
        name: 'Alignment',
        options: DropdownUtils.generateDropdownStructure(['Above', 'Below']),
        activeItemPropertyKeyName: 'zIndexAlignment',
        customFeatureObjectKeys: ['customFeatures', 'dropdown', 'zIndexAlignment'],
        ...generateMouseEventCallbacks(),
      },
    },
  ]
};

import { UpdateDropdownOptionNamesShared } from '../../../utils/componentManipulation/updateChildComponent/updateDropdownOptionNamesShared';
import { ActionsDropdownMouseEventCallbacks } from '../../../../../../interfaces/actionsDropdownsMouseEventCallbacks';
import { MenuIndexAlignment } from '../../../newComponent/types/dropdowns/settings/menuIndexAlignment';
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
        name: 'Alignment',
        options: UpdateDropdownOptionNamesShared.generateDropdownStructure(['Above', 'Below']),
        activeOptionPropertyKeyName: 'indexAlignment',
        customFeatureObjectKeys: ['customStaticFeatures', 'dropdown', 'indexAlignment'],
        ...generateMouseEventCallbacks(),
      },
    },
  ]
};

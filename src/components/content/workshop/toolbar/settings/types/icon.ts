import { ActionsDropdownMouseEventCallbackEvent, ActionsDropdownMouseEventCallbacks } from '../../../../../../interfaces/actionsDropdownsMouseEventCallbacks';
import { UpdateDropdownOptionNamesShared } from '../../../utils/componentManipulation/updateNestedComponentNames/updateDropdownOptionNamesShared';
import { DROPDOWN_ARROW_ICON_TYPES } from '../../../../../../consts/dropdownArrowIcons';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';
import { IconBase } from '../../../newComponent/types/icon/generators/base';

function generateMouseEventCallbacks(): ActionsDropdownMouseEventCallbacks {
  return {
    mouseEnterOptionCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
      IconBase.changeIconFunc(event.subcomponentProperties, event.triggeredOptionName);
    },
    mouseLeaveDropdownCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
      IconBase.changeIconFunc(event.subcomponentProperties, event.triggeredOptionName);
    },
  };
}

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.ACTIONS_DROPDOWN,
      spec: {
        name: 'Type',
        options: UpdateDropdownOptionNamesShared.generateNestedDropdownStructure(Object.values(DROPDOWN_ARROW_ICON_TYPES)),
        activeOptionPropertyKeyName: 'name',
        customFeatureObjectKeys: ['customFeatures', 'icon', 'name'],
        ...generateMouseEventCallbacks(),
        customFunctionKeys: ['customFeatures', 'icon', 'changeIconFunc'],
      },
    },
  ]
};

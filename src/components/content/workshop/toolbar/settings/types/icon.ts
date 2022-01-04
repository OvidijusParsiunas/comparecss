import { ActionsDropdownMouseEventCallbacks } from '../../../../../../interfaces/actionsDropdownsMouseEventCallbacks';
import { DropdownUtils } from '../../../utils/componentManipulation/utils/dropdownUtils';
import { DROPDOWN_ARROW_ICON_TYPES } from '../../../../../../consts/dropdownArrowIcons';
import { IconFilterCss } from '../../../newComponent/types/icon/settings/iconFilterCss';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';
import { SETTING_NAMES } from '../../../../../../consts/settingNames.enum';
import { ICON_TYPES } from '../../../../../../consts/iconTypes.enum';

function generateMouseEventCallbacks(): ActionsDropdownMouseEventCallbacks {
  return {
    mouseClickItemCallback: IconFilterCss.unsetFilterCss,
  };
}

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.ACTIONS_DROPDOWN,
      spec: {
        name: SETTING_NAMES.TYPE,
        options: DropdownUtils.generateDropdownStructure(Object.values(ICON_TYPES)),
        activeItemPropertyKeyName: 'type',
        customFeatureObjectKeys: ['customStaticFeatures', 'icon', 'type'],
        refreshSetting: true,
        ...generateMouseEventCallbacks(),
      },
    },
    {
      type: SETTINGS_TYPES.ACTIONS_DROPDOWN,
      spec: {
        name: SETTING_NAMES.BASIC_ICON,
        options: DropdownUtils.generateDropdownStructure(Object.values(DROPDOWN_ARROW_ICON_TYPES)),
        activeItemPropertyKeyName: 'name',
        customFeatureObjectKeys: ['customStaticFeatures', 'icon', 'name'],
        displayIfValueActive: {
          customFeatureObjectKeys: ['customStaticFeatures', 'icon', 'type'],
          value: ICON_TYPES.BASIC,
        },
      },
    },
    {
      type: SETTINGS_TYPES.UPLOAD_FILE,
      spec: {
        name: 'Image',
        customFeatureObjectKeys: ['customStaticFeatures', 'icon', 'svgImage', 'data'],
        auxiliaryCustomFeatureObjectKeys: ['customStaticFeatures', 'icon', 'svgImage', 'name'],
        default: 'text',
        displayIfValueActive: {
          customFeatureObjectKeys: ['customStaticFeatures', 'icon', 'type'],
          value: ICON_TYPES.CUSTOM,
        },
        uploadFileButtonProps: {
          text: 'Upload SVG',
          fileTypes: '.svg',
        },
      },
    },
  ]
};

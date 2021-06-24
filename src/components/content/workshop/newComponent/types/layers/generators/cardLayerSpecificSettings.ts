import SubcomponentSpecificSettingsUtils from '../../../../toolbar/settings/utils/subcomponentSpecificSettingsUtils';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { SubcomponentSpecificSettings } from '../../../../../../../interfaces/workshopComponent';

const verticalBoxShadowPropertyName = 'boxShadow';
const verticalBoxShadowPartialCssPosition = 1;
const verticalBoxShadowKeyName = SubcomponentSpecificSettingsUtils.generatePartialCssPropertyName(verticalBoxShadowPropertyName, verticalBoxShadowPartialCssPosition);
export const cardLayerSpecificSettings: SubcomponentSpecificSettings = {
  [WORKSHOP_TOOLBAR_OPTION_TYPES.SHADOW_VERTICAL]: {
    [verticalBoxShadowKeyName]: { scale: [0, 100] },
  },
};

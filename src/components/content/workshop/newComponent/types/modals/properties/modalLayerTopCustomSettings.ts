import PartialCssCustomSettingsUtils from '../../../../../../../components/content/workshop/toolbar/settings/utils/partialCssCustomSettingsUtils';
import { WORKSHOP_TOOLBAR_OPTIONS } from '../../../../../../../consts/workshopToolbarOptions';
import { CustomSettings } from '../../../../../../../interfaces/workshopComponent';

const verticalBoxShadowPropertyName = 'boxShadow';
const verticalBoxShadowPartialCssPosition = 1;
const verticalBoxShadowKeyName = PartialCssCustomSettingsUtils.generateCustomPartialCssPropertyName(verticalBoxShadowPropertyName, verticalBoxShadowPartialCssPosition);
export const modalLayerTopCustomSettings: CustomSettings = {
  [WORKSHOP_TOOLBAR_OPTIONS.SHADOW_VERTICAL]: {
    [verticalBoxShadowKeyName]: { scale: [0, 100] },
  },
}

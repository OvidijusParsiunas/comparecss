import { SETTINGS_TYPES } from '../consts/settingsTypes.enum';
import { Subcomponent } from './workshopComponent';

export type TriggerFuncOnSettingChange = {
  [key in SETTINGS_TYPES]?: (subcomponent: Subcomponent, updatedSetting?: any) => void;
}

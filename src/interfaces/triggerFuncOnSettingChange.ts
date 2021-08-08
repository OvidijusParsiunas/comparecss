import { SETTINGS_TYPES } from '../consts/settingsTypes.enum';
import { SubcomponentProperties } from './workshopComponent';

export type TriggerFuncOnSettingChange = {
  [key in SETTINGS_TYPES]?: (subcomponentProperties: SubcomponentProperties, updatedSetting?: any) => void;
}

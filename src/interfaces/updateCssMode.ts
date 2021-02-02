import { SUB_COMPONENT_CSS_MODES } from '../consts/subcomponentCssModes.enum';
import { SUB_COMPONENTS } from '../consts/subcomponentModes.enum';
import { SettingProperties } from './componentOptions';

export type UpdateOptionsMode = [(SUB_COMPONENT_CSS_MODES | SUB_COMPONENTS)?, SettingProperties?]

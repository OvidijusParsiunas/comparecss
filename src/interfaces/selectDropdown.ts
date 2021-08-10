import { SubcomponentProperties } from './workshopComponent';

export interface SubcomponentMouseEventItemText {
  lastHoveredItemText: string;
  lastSelectedItemText: string;
}

export type SelectDropdown = {
  enabled: boolean;
  defaultText: string;
  callback: (subcomponentProperties: SubcomponentProperties) => void;
} & SubcomponentMouseEventItemText;

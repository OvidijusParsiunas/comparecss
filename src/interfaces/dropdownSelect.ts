import { SubcomponentProperties } from './workshopComponent';

export interface SubcomponentMouseEventItemText {
  lastHoveredItemText: string;
  lastSelectedItemText: string;
}

export type DropdownSelect = {
  enabled: boolean;
  defaultText: string;
  callback: (subcomponentProperties: SubcomponentProperties) => void;
} & SubcomponentMouseEventItemText;

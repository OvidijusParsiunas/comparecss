import { SubcomponentProperties } from './workshopComponent';

type Callback = (subcomponentProperties: SubcomponentProperties) => void;

export interface SubcomponentMouseEventCallbacks {
  click: Callback;
  mouseEnter: Callback;
}

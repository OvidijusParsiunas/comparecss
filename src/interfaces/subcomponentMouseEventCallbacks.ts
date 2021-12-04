import { Subcomponent } from './workshopComponent';

type Callback = (subcomponent: Subcomponent) => void;

export interface SubcomponentMouseEventCallbacks {
  click?: Callback;
  mouseEnter?: Callback;
}

import { SubcomponentProperties } from './workshopComponent';

export interface Icon {
  name: string;
  isComponentDisplayed: boolean;
  changeIconFunc: (subcomponentProperties: SubcomponentProperties, newValue: string) => void;
}

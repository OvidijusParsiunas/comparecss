import { CustomSubcomponentNames } from './customSubcomponentNames';
import { Subcomponents } from './workshopComponent';

export type OverwritePropertiesFunc = (subcomponents: Subcomponents, subcomponentNames: CustomSubcomponentNames) => void;

export type NewComponentProperties = {
  baseName: string;
  subcomponents: Subcomponents;
}

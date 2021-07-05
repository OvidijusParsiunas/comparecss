import { CoreSubcomponentNames } from './customSubcomponentNames';
import { Subcomponents } from './workshopComponent';

export type OverwritePropertiesFunc = (subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames) => void;

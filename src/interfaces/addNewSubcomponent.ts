import { SubcomponentProperties, Subcomponents } from './workshopComponent';

export type NewSubcomponentProperties = {
  name: string;
  subcomponentProperties: SubcomponentProperties;
}

export type NewImportedComponentProperties = {
  baseName: string;
  subcomponents: Subcomponents;
}

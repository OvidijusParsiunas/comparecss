import { SubcomponentProperties } from './workshopComponent';

interface AutoSizeDimensions {
  width?: boolean;
  height?: boolean;
}

export interface AutoSizeFuncs {
  widthCalculationFunc?: (subcomponentProperties: SubcomponentProperties) => void;
  heightCalucationFunc?: (subcomponentProperties: SubcomponentProperties) => void;
}

export type AutoSize = AutoSizeDimensions & AutoSizeFuncs;

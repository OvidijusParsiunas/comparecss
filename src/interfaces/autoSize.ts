import { Subcomponent } from './workshopComponent';

interface AutoSizeDimensions {
  width?: boolean;
  height?: boolean;
}

export interface AutoSizeFuncs {
  widthCalculationFunc?: (subcomponent: Subcomponent) => void;
  heightCalucationFunc?: (subcomponent: Subcomponent) => void;
}

export type AutoSize = AutoSizeDimensions & AutoSizeFuncs;

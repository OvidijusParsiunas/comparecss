import { SUBCOMPONENT_ORDER_DIRECTIONS } from './subcomponentOrderDirections.enum';
import { SubcomponentProperties, WorkshopComponent } from './workshopComponent';
import { AlignedSections } from './componentPreviewStructure';

export interface ChangeOrderTargetDetails {
  direction: SUBCOMPONENT_ORDER_DIRECTIONS;
  targetSubcomponentName: string;
  targetDropdownOptionName: string;
  parentComponent: WorkshopComponent;
  targetSubcomponentProperties: SubcomponentProperties;
  parentLayerAlignedSections?: AlignedSections;
}

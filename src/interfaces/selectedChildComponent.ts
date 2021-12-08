import { CSS_PSEUDO_CLASSES } from '../consts/subcomponentCssClasses.enum';
import { WorkshopComponent } from './workshopComponent';

export interface SelectComponentContainer {
  isModeActive: boolean;
  selectedComponent: WorkshopComponent;
  activeCssPseudoClass: CSS_PSEUDO_CLASSES;
}

export interface ChildComponent {
  isSelected: boolean;
  containerSelectComponentObj: SelectComponentContainer;
}

export interface SelectComponent {
  child?: ChildComponent;
  container?: SelectComponentContainer;
}

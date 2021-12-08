import { ACTIVE_CSS_PSEUDO_CLASSES, CSS_PSEUDO_CLASSES } from '../consts/subcomponentCssClasses.enum';
import { SELECT_CHILD_COMPONENT_STYLE_DISABLED } from '../consts/selectedChildComponent';
import { WorkshopComponent } from './workshopComponent';

export type SELECT_CHILD_COMPONENT_STYLE_OPTIONS = ACTIVE_CSS_PSEUDO_CLASSES | typeof SELECT_CHILD_COMPONENT_STYLE_DISABLED;

export const SELECT_CHILD_COMPONENT_STYLE_OPTIONS = {
  [SELECT_CHILD_COMPONENT_STYLE_DISABLED]: SELECT_CHILD_COMPONENT_STYLE_DISABLED,
  [CSS_PSEUDO_CLASSES.HOVER]: CSS_PSEUDO_CLASSES.HOVER,
  [CSS_PSEUDO_CLASSES.CLICK]: CSS_PSEUDO_CLASSES.CLICK,
} as { [key in SELECT_CHILD_COMPONENT_STYLE_OPTIONS]: SELECT_CHILD_COMPONENT_STYLE_OPTIONS };

export interface SelectComponentContainer {
  isModeActive: boolean;
  selectedComponent: WorkshopComponent;
  activeStyle: SELECT_CHILD_COMPONENT_STYLE_OPTIONS;
}

export interface ChildComponent {
  isSelected: boolean;
  containerSelectComponentObj: SelectComponentContainer;
}

export interface SelectComponent {
  // used by individual child components that can be selected
  child?: ChildComponent;
  // used by the componenter that contains the selectable child components
  container?: SelectComponentContainer;
}

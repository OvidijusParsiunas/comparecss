import { MODAL_TRANSITION_ENTRANCE_TYPES, MODAL_TRANSITION_EXIT_TYPES } from '../consts/modalTransitionTypes.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../consts/workshopToolbarOptionTypes.enum';
import { SUB_COMPONENT_CSS_MODES } from '../consts/subcomponentCssModes.enum';
import { ComponentJavascriptClasses } from './componentJavascriptClasses';
import { NEW_COMPONENT_TYPES } from '../consts/newComponentTypes.enum';
import { NestedDropdownStructure } from './nestedDropdownStructure';
import { SUB_COMPONENTS } from '../consts/subcomponentModes.enum';
import { WorkshopComponentCss } from './workshopComponentCss';
import { TempCustomCss } from './tempCustomCss';
import { InheritedCss } from './inheritedCss';

type InnerSubcomponents = { [key in SUB_COMPONENTS]?: SubcomponentProperties };

type Layer = {
  subcomponentType: SUB_COMPONENTS;
  customCss: CustomCss;
  subcomponents: InnerSubcomponents;
}

export interface ComponentPreviewStructure {
  baseCss: SubcomponentProperties;
  // will be used in the future, can be horizontal or vertical
  layeringType?: string;
  layers?: Layer[];
  subcomponentDropdownStructure?: NestedDropdownStructure;
}

export interface ChildCss {
  elementTag: string;
  childNumber: number;
  hasCustomCss?: boolean;
  inheritedCss: WorkshopComponentCss;
  // the array is used to allow multiple childCss values at a particular level
  nestedChildCss?: ChildCss[];
}

export interface DescendantCss {
  elements?: Set<string>;
  classes?: Set<string>;
  css: WorkshopComponentCss;
}

export type CustomCss = {
  [key in SUB_COMPONENT_CSS_MODES]?: WorkshopComponentCss;
}

export interface OptionalSubcomponent {
  currentlyDisplaying: boolean;
  // appended at app runtime
  displayOverlayOnly?: boolean;
}

export type SubcomponentSpecificSettings = {
  [key in WORKSHOP_TOOLBAR_OPTION_TYPES]?: {
    [cssPropertyName: string]: {
      scale?: [number, number];
    }
  };
}

export interface ComponentTransitions {
  entrance: {
    type: MODAL_TRANSITION_ENTRANCE_TYPES;
    duration: string;
    delay: string;
  },
  exit: {
    type: MODAL_TRANSITION_EXIT_TYPES;
    duration: string;
  },
}

export interface ComponentCenteringInParent {
  vertical: boolean;
  horizontal: boolean;
}

export interface BackdropProperties {
  color: string;
  alpha: number;
  visible: boolean;
}

export interface CustomFeatures {
  backdrop?: BackdropProperties;
  // currently used to position modal either in the center of the screen or the top
  componentCenteringInParent?: ComponentCenteringInParent;
  transitions?: ComponentTransitions;
  jsClasses?: ComponentJavascriptClasses;
}

export interface SubcomponentProperties {
  componentTag?: string;
  componentText?: string;
  customCss: CustomCss;
  initialCss: CustomCss;
  // this css is used in instances where partialCss has been overwrittern by a single value, but a fraction of it
  // must be retained for use by settings - boxShadow (to note, this is mostly used by the app in runtime)
  auxiliaryPartialCss?: CustomCss;
  // this is used to signify css that gets used within the app only and gets removed when exporing - should only be used on subcomponents that will have transition effects
  tempCustomCss?: TempCustomCss;
  // this css is not configured by the user and comes along with the component
  inheritedCss?: InheritedCss;
  // this css is used for nested classes or element tags e.g. .my-component div {
  // the code to export this has been removed on the 19th of Dec 2020 - commit id: f6391eb61305106001709130ce4f45877226069b, remove if all component types added and this is not needed
  descendantCss?: DescendantCss;
  // this css is used for particular nested children (.default-class-name > div:nth-child(2))
  childCss?: ChildCss[];
  activeCustomCssMode: SUB_COMPONENT_CSS_MODES;
  // the motivator for this is the fact that the first subcomponent css mode should not be assumed to be the default one
  defaultCustomCssMode: SUB_COMPONENT_CSS_MODES;
  // this is used to add an animation effect when hovering or clicking a subcomponent to display their new custom css
  // it is currently not being used during css export and instead added explicitly using inherited css files
  subcomponentPreviewTransition?: string;
  optionalSubcomponent?: OptionalSubcomponent;
  // the reason why custom css is attached here is to not have to keep multiple unique settings for each and every subcomponent in memory all at once
  subcomponentSpecificSettings?: SubcomponentSpecificSettings;
  customFeatures?: CustomFeatures;
  defaultCustomFeatures?: CustomFeatures;
}

export type Subcomponents = {
  [property in SUB_COMPONENTS]?: SubcomponentProperties;
}

export interface WorkshopComponent {
  type: NEW_COMPONENT_TYPES;
  subcomponents: Subcomponents;
  activeSubcomponentMode: SUB_COMPONENTS;
  // the motivator for this is the fact that the first subcomponent should not be assumed to be the default one
  defaultSubcomponentMode: SUB_COMPONENTS;
  componentPreviewStructure: ComponentPreviewStructure;
  // class name for the component
  className: string;
}

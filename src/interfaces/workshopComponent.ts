import { MODAL_TRANSITION_ENTRANCE_TYPES, MODAL_TRANSITION_EXIT_TYPES } from '../consts/modalTransitionTypes.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../consts/workshopToolbarOptionTypes.enum';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../consts/layerSections';
import { ComponentPreviewStructure, Layer } from './componentPreviewStructure';
import { CSS_PSEUDO_CLASSES } from '../consts/subcomponentCssClasses.enum';
import { ComponentJavascriptClasses } from './componentJavascriptClasses';
import { NEW_COMPONENT_TYPES } from '../consts/newComponentTypes.enum';
import { CustomSubcomponentNames } from './customSubcomponentNames';
import { WorkshopComponentCss } from './workshopComponentCss';
import { TempCustomCss } from './tempCustomCss';
import { InheritedCss } from './inheritedCss';

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
  [key in CSS_PSEUDO_CLASSES]?: WorkshopComponentCss;
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

export interface BackdropProperties {
  color: string;
  alpha: number;
  visible: boolean;
}

export interface ComponentCenteringInParent {
  vertical: boolean;
  horizontal: boolean;
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

export interface AutoWidth {
  auto: boolean;
}

export interface AlignedLayerSection {
  section: ALIGNED_SECTION_TYPES;
}

export interface CustomFeatures {
  backdrop?: BackdropProperties;
  // currently used to position modal either in the center of the screen or the top
  componentCenteringInParent?: ComponentCenteringInParent;
  transitions?: ComponentTransitions;
  jsClasses?: ComponentJavascriptClasses;
  autoWidth?: AutoWidth;
  alignedLayerSection?: AlignedLayerSection,
  // appended in run-time
  parentLayer?: Layer;
}

  export interface SubcomponentProperties {
  componentTag?: string;
  componentText?: string;
  customCss: CustomCss;
  initialCss: CustomCss;
  // this css is used in instances where partialCss has been overwrittern by a single value, but a fraction of it
  // must be retained for use by settings - boxShadow (to note, this is mostly used by the app in runtime)
  auxiliaryPartialCss?: CustomCss;
  // this is used to signify css that gets used within the app only and gets removed when exporting - should only be used on subcomponents that will have transition effects
  tempCustomCss?: TempCustomCss;
  // this css is not configured by the user and comes along with the component
  inheritedCss?: InheritedCss;
  // this css is used for nested classes or element tags e.g. .my-component div {
  // the code to export this has been removed on the 19th of Dec 2020 - commit id: f6391eb61305106001709130ce4f45877226069b, remove if all component types added and this is not needed
  descendantCss?: DescendantCss;
  // this css is used for particular nested children (.default-class-name > div:nth-child(2))
  childCss?: ChildCss[];
  activeCssPseudoClass: CSS_PSEUDO_CLASSES;
  // the motivator for this is the fact that the first subcomponent css pseudo class should not be assumed to be the default one
  defaultCssPseudoClass: CSS_PSEUDO_CLASSES;
  // this is used to add an animation effect when hovering or clicking a subcomponent to display their new custom css
  // it is currently not being used during css export and instead added explicitly using inherited css files
  subcomponentPreviewTransition?: string;
  optionalSubcomponent?: OptionalSubcomponent;
  // the reason why custom css is attached here is to not have to keep multiple unique settings for each and every subcomponent in memory all at once
  subcomponentSpecificSettings?: SubcomponentSpecificSettings;
  customFeatures?: CustomFeatures;
  defaultCustomFeatures?: CustomFeatures;
  layerSectionsType?: LAYER_SECTIONS_TYPES;
  importedComponent?: WorkshopComponent;
}

export type Subcomponents = {
  [subcomponentName: string]: SubcomponentProperties;
}

export interface WorkshopComponent {
  type: NEW_COMPONENT_TYPES;
  subcomponents: Subcomponents;
  activeSubcomponentName: string;
  // the motivator for this is the fact that the first subcomponent should not be assumed to be the default one
  defaultSubcomponentName: string;
  componentPreviewStructure: ComponentPreviewStructure;
  // class name for the component
  className: string;
  // used for imported components
  subcomponentNames?: CustomSubcomponentNames;
}

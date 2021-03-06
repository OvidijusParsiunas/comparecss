import { GENERAL_ANIMATION_CLOSE_TYPES, MODAL_ANIMATION_OPEN_TYPES, MODAL_ANIMATION_CLOSE_TYPES } from '../consts/animationTypes.enum';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../consts/layerSections.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../consts/workshopToolbarOptionTypes.enum';
import { ComponentPreviewStructure, Layer } from './componentPreviewStructure';
import { CSS_PSEUDO_CLASSES } from '../consts/subcomponentCssClasses.enum';
import { ComponentJavascriptClasses } from './componentJavascriptClasses';
import { NEW_COMPONENT_TYPES } from '../consts/newComponentTypes.enum';
import { SUBCOMPONENT_TYPES } from '../consts/subcomponentTypes.enum';
import { CustomSubcomponentNames } from './customSubcomponentNames';
import { WorkshopComponentCss } from './workshopComponentCss';
import { EntityDisplayStatus } from './entityDisplayStatus';
import { TempCustomCss } from './tempCustomCss';
import { CloseTriggers } from './closeTriggers';

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

interface TemporaryDisplayStatus {
  isDisplayedTemporarily?: boolean;
}

export interface DetailsToUpdateOtherCssProperties {
  cssProperty: keyof WorkshopComponentCss;
  customCss: CustomCss;
  customFeatures: CustomFeatures;
  isScaleNegativeToPositive: boolean;
  divisor?: number;
}

export type SubcomponentDisplayStatus = EntityDisplayStatus & TemporaryDisplayStatus;

export type SubcomponentSpecificSettings = {
  [key in WORKSHOP_TOOLBAR_OPTION_TYPES]?: {
    [cssPropertyName: string]: {
      scale?: [number, number];
      detailsToUpdateOtherCssProperties?: DetailsToUpdateOtherCssProperties[];
    }
  };
}

export interface PreventPermanentEditByOtherSettings {
  currentValue: string;
  lastSelectedValue: string;
  // the value is automatically set to the total of modal open duration and delay
  isAuto: boolean;
}

export interface BackdropProperties {
  color: string;
  alpha: number;
  openAnimationDuration: PreventPermanentEditByOtherSettings;
  closeAnimationDuration?: string;
  opacity: number;
  visible: boolean;
}

export interface ComponentCenteringInParent {
  vertical: boolean;
  horizontal: boolean;
}

export interface Animations {
  open?: {
    type: MODAL_ANIMATION_OPEN_TYPES;
    duration: string;
    delay: string;
  },
  close: {
    type: MODAL_ANIMATION_CLOSE_TYPES | GENERAL_ANIMATION_CLOSE_TYPES;
    duration: string;
  },
}

export interface AutoSize {
  width?: boolean;
  height?: boolean;
}

export interface Text {
  text: string;
}

export interface AlignedLayerSection {
  section: ALIGNED_SECTION_TYPES;
}

export interface CustomFeatures {
  backdrop?: BackdropProperties;
  // currently used to position modal either in the center of the screen or the top
  componentCenteringInParent?: ComponentCenteringInParent;
  animations?: Animations;
  closeTriggers?: CloseTriggers;
  jsClasses?: ComponentJavascriptClasses;
  autoSize?: AutoSize;
  alignedLayerSection?: AlignedLayerSection;
  circleBorder?: boolean;
  lastSelectedCssValues?: WorkshopComponentCss;
}

export interface Image {
  name: string;
  data: string;
  size: boolean;
}

export interface CustomStaticFeatures {
  subcomponentText?: Text;
  image?: Image;
}

interface TempCustomProperties {
  customCss: CustomCss;
  customFeatures?: CustomFeatures;
}

export interface ImportedComponent {
  componentRef: WorkshopComponent;
  inSync: boolean;
  lastSelectedComponentToImport?: WorkshopComponent;
}

export interface SubcomponentProperties {
  // used for defining options
  subcomponentType?: SUBCOMPONENT_TYPES;
  // may not be required if always div
  componentTag?: string;
  customCss: CustomCss;
  defaultCss: CustomCss;
  // this css is used in instances where partialCss has been overwrittern by a single value, but a fraction of it
  // must be retained for use by settings - boxShadow (to note, this is mostly used by the app in runtime)
  auxiliaryPartialCss?: CustomCss;
  // this is used to signify css that gets used within the app only and gets removed when exporting - should only be used on subcomponents that will have transition effects
  tempCustomCss?: TempCustomCss;
  // this css is not configured by the user and comes along with the component
  inheritedCss?: WorkshopComponentCss;
  // this css is used for nested classes or element tags e.g. .my-component div {
  // the code to export this has been removed on the 19th of Dec 2020 - commit id: f6391eb61305106001709130ce4f45877226069b, remove if all component types added and this is not needed
  descendantCss?: DescendantCss;
  // this css is used during export for elements that have nested children (.default-class-name > div:nth-child(2))
  childCss?: ChildCss[];
  activeCssPseudoClass: CSS_PSEUDO_CLASSES;
  // the motivator for this is the fact that the first subcomponent css pseudo class should not be assumed to be the default one
  defaultCssPseudoClass: CSS_PSEUDO_CLASSES;
  // this is used to add an animation effect when hovering or clicking a subcomponent to display their new custom css
  // it is currently not being used during css export and instead added explicitly using inherited css files
  subcomponentPreviewTransition?: string;
  subcomponentDisplayStatus?: EntityDisplayStatus & SubcomponentDisplayStatus;
  // the reason why custom css is attached here is to not have to keep multiple unique settings for each and every subcomponent in memory all at once
  subcomponentSpecificSettings?: SubcomponentSpecificSettings;
  customFeatures?: CustomFeatures;
  defaultCustomFeatures?: CustomFeatures;
  // features that would not be overwritten by imported subcomponent features
  customStaticFeatures?: CustomStaticFeatures; 
  defaultCustomStaticFeatures?: CustomStaticFeatures;
  layerSectionsType?: LAYER_SECTIONS_TYPES;
  importedComponent?: ImportedComponent;
  // used to track the imported component's base inSync property
  baseSubcomponentRef?: SubcomponentProperties;
  // this is used for imported subcomponents as overwriting customCss with mouseevents causes all the other in-sync references to be updated as well
  tempCustomCssObjName?: string;
  parentLayer?: Layer;
  // temporarily holds the original customCss when a component card has been hovered/selected during component import mode 
  tempOriginalCustomProperties?: TempCustomProperties;
  // when a subcomponent's mouse event is triggered, trigger another subcomponent's mouse events
  triggerableSubcomponentName?: string;
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
  // used to update imported subcomponent when it is in sync
  componentStatus: { isRemoved: boolean };
  // used to reassign references when the subcomponents have been deep copied
  referenceSharingExecutables?: ((...any: any) => void)[];
}

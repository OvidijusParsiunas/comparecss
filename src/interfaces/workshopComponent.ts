import { InterconnectedSetting, SubcomponentSpecificSettings } from './subcomponentSpecificSettings';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../consts/layerSections.enum';
import { SubcomponentMouseEventCallbacks } from './subcomponentMouseEventCallbacks';
import { NewChildComponentsOptionsRefs } from './newChildComponentsOptionsRefs';
import { ComponentPreviewStructure, Layer } from './componentPreviewStructure';
import { DROPDOWN_MENU_POSITIONS } from '../consts/dropdownMenuPositions.enum';
import { CSS_PSEUDO_CLASSES } from '../consts/subcomponentCssClasses.enum';
import { ComponentJavascriptClasses } from './componentJavascriptClasses';
import { ReferenceSharingExecutable } from './referenceSharingExecutable';
import { TriggerFuncOnSettingChange } from './triggerFuncOnSettingChange';
import { ChildComponentsInLayer } from './childComponentsLockedToLayer';
import { SUBCOMPONENT_TYPES } from '../consts/subcomponentTypes.enum';
import { NestedDropdownStructure } from './nestedDropdownStructure';
import { COMPONENT_STYLES } from '../consts/componentStyles.enum';
import { COMPONENT_TYPES } from '../consts/componentTypes.enum';
import { WorkshopComponentCss } from './workshopComponentCss';
import { CoreSubcomponentRefs } from './coreSubcomponentRefs';
import { ChildComponentCount } from './childComponentCount';
import { LinkedComponents } from './linkedComponents';
import { SelectDropdown } from './selectDropdown';
import { TempCustomCss } from './tempCustomCss';
import { CloseTriggers } from './closeTriggers';
import { Animations } from './animations';
import { AutoSize } from './autoSize';
import { Icon } from './icon';

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

export interface UpdateOtherCssProperties {
  customCss?: CustomCss;
  cssProperty?: keyof WorkshopComponentCss;
  customFeatures?: CustomFeatures;
  customFeatureKeys?: string[];
  isScaleNegativeToPositive?: boolean;
  divisor?: number;
  postfix?: string;
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

export interface ComponentCenteringInScreen {
  vertical: boolean;
  horizontal: boolean;
}

export interface Text {
  text: string;
}

export interface AlignedLayerSection {
  section: ALIGNED_SECTION_TYPES;
}

export interface DropdownMenuPosition {
  position: DROPDOWN_MENU_POSITIONS;
}

// should not be primitives as these values are copied by key
export interface CustomFeatures {
  backdrop?: BackdropProperties;
  // currently used to position modal either in the center of the screen or the top
  componentCenteringInScreen?: ComponentCenteringInScreen;
  animations?: Animations;
  closeTriggers?: CloseTriggers;
  jsClasses?: ComponentJavascriptClasses;
  autoSize?: AutoSize;
  alignedLayerSection?: AlignedLayerSection;
  circleBorder?: boolean;
  lastSelectedCssValues?: WorkshopComponentCss;
  dropdownMenuPosition?: DropdownMenuPosition;
  mouseEventCallbacks?: SubcomponentMouseEventCallbacks;
  icon?: Icon;
}

export interface Image {
  name: string;
  data: string;
  size: boolean;
}

export interface CustomStaticFeatures {
  subcomponentText?: Text;
  selectDropdown?: SelectDropdown;
  image?: Image;
}

interface TempCustomProperties {
  customCss: CustomCss;
  customFeatures?: CustomFeatures;
}

export interface SeedComponent {
  ref: WorkshopComponent;
  inSync: boolean;
  lastSelectedComponentToCopy?: WorkshopComponent;
}

export interface SubcomponentProperties {
  name: string;
  // used for defining options and adding new subcomponents to a layer
  subcomponentType?: SUBCOMPONENT_TYPES;
  customCss: CustomCss;
  defaultCss: CustomCss;
  // this css is used in instances where partialCss has been overwritten by a single value, but a fraction of it
  // must be retained for use by settings - boxShadow (to note, this is mostly used by the app in runtime)
  auxiliaryPartialCss?: CustomCss;
  // this is used to signify css that gets used within the app only and gets removed when exporting - (temporary or overwritten by custom features)
  tempCustomCss?: TempCustomCss;
  // this css is not configured by the user and comes along with the component
  inheritedCss?: WorkshopComponentCss;
  // this css is used for nested classes or element tags e.g. .my-component div {
  // the code to export this has been removed on the 19th of Dec 2020 - commit id: f6391eb61305106001709130ce4f45877226069b, remove if all component types added and this is not needed
  descendantCss?: DescendantCss;
  // this css is used during export for elements that have children (.default-class-name > div:nth-child(2))
  childCss?: ChildCss[];
  activeCssPseudoClass: CSS_PSEUDO_CLASSES;
  // the motivator for this is the fact that the first subcomponent css pseudo class should not be assumed to be the default one
  defaultCssPseudoClass: CSS_PSEUDO_CLASSES;
  // the reason why custom css is attached here is to not have to keep multiple unique settings for each and every subcomponent in memory all at once
  subcomponentSpecificSettings?: SubcomponentSpecificSettings;
  customFeatures?: CustomFeatures;
  defaultCustomFeatures?: CustomFeatures;
  // features that would not be overwritten by imported child component's subcomponents
  customStaticFeatures?: CustomStaticFeatures; 
  defaultCustomStaticFeatures?: CustomStaticFeatures;
  layerSectionsType?: LAYER_SECTIONS_TYPES;
  // it is important to understand that the subcomponents of a child component are located in the core base component's subcomponents section
  // and the seedComponent property is used to reference the seedComponent they belong to
  // full structure explained at the bottom of the file titled: 'Reference for component structure'
  seedComponent?: SeedComponent;
  // baseSubcomponentRef is only appended to all the child subcomponents (except the base subcomponents)
  // this is mostly used to track the child component's inSync property and identify whether the subcomponent is child and not base
  baseSubcomponentRef?: SubcomponentProperties;
  // this is used for overwriting css properties on mouse actions as adding css directly to customCss causes in-sync components to be edited all at once
  overwrittenCustomCssObj?: CustomCss;
  parentLayer?: Layer;
  // temporarily holds the original customCss when a component card has been hovered/selected during component import mode 
  tempOriginalCustomProperties?: TempCustomProperties;
  // when a subcomponent's mouse event is triggered, trigger other subcomponents' mouse events
  // should currently be placed on base subcomponent only, if that changes - ammend the removeTriggerableSubcomponent method in RemoveAnyChildComponent class
  otherSubcomponentsToTrigger?: CoreSubcomponentRefs;
  isTriggeredByAnotherSubcomponent?: boolean;
  // options for the add child component dropdown
  newChildComponentsOptions?: NestedDropdownStructure;
   // used to temporarily display a child component when hovering add subcomponent dropdown options with a mouse
  isTemporaryAddPreview?: boolean;
  isRemovable?: boolean;
}

export type Subcomponents = {
  [subcomponentName: string]: SubcomponentProperties;
}

export interface WorkshopComponent {
  type: COMPONENT_TYPES;
  style: COMPONENT_STYLES;
  subcomponents: Subcomponents;
  activeSubcomponentName: string;
  // the motivator for this is the fact that the first subcomponent should not be assumed to be the default one
  defaultSubcomponentName: string;
  componentPreviewStructure: ComponentPreviewStructure;
  // class name for the component
  className: string;
  // used for referencing component's core subcomponents like base and text
  // also used for referencing subcomponents that should share jsclasses refs
  coreSubcomponentRefs?: CoreSubcomponentRefs;
  // gives an in sync child component to identify if the copied component has not been deleted
  componentStatus: { isRemoved: boolean };
  // used to reassign references when the subcomponents have been deep copied
  referenceSharingExecutables?: ReferenceSharingExecutable[];
  // a layer cannot be a standalone child component that contains other child components, thus this function adds child components to the layer
  // with a reference the parent component
  childComponentsLockedToLayer?: ChildComponentsInLayer;
  interconnectedSettings?: InterconnectedSetting[];
  childComponentCount?: ChildComponentCount;
  areLayersInSyncByDefault?: boolean;
  // when a particular setting is changed (e.g. input or range) - call a particular function
  triggerFuncOnSettingChange?: TriggerFuncOnSettingChange;
  // used to share add dropdown options across components such as layers - in order to make sure that the enabled and disabled items are in-sync
  newChildComponentsOptionsRefs?: NewChildComponentsOptionsRefs;
  // WORK 1: include this in an explanation
  linkedComponents?: LinkedComponents;
  // reference to the parent that contains this component's base
  // full structure explained at the bottom of the file titled: 'Reference for component structure'
  parentComponent?: WorkshopComponent;
  // WORK1: update the diagram with all the new details
  masterComponentRef?: WorkshopComponent;
}

// Reference for component structure:

// core base component -> subcomponents (all of the components subcomponents)
// All of the nested components' (incl auxiliary component's) subcomponents, subcomponentDropdownStructure and subcomponentNameToDropdownOptionName
// property values are placed in the core base component (and removed from the nested components)
// This approach allows these values to be maintained (e.g. added/removed) all in one place 

// Subcomponents that belong to nested components can access their own immediate components via the following properties:
//   seedComponent -> ref
// Also, subcomponents of the nested components that are not their bases can access their base subcomponent via the following property:
//   baseSubcomponentRef
// parent component -> subcomponents (not base)        +        subcomponents (base)
//                     |          |                                   |
//         seedComponent       baseSubcomponentRef           seedComponent
//                     |                                              |            
//                    ref                                            ref
//                     |                                              |
//       nested component                                       nested component
// baseSubcomponentRef allows base, layer and text subcomponents to all reference the same component (such as a button)

// Nested components can access the parent which they are nested in via parentComponent
// (their subcomponents' seedComponent -> ref property only points to their immediate component which may not hold useful information
// as the subcomponents and componentPreviewStructure data are all maintaintained in the parental components - e.g. text subcomponent)
// It is important to understand that base subcomponents' seedComponent -> ref -> parentComponent property directly references the nested
// component's parent as base does not have its own immediate component
// top parent component -> subcomponents (e.g. button text)    +   subcomponents (button base)
//                                      |                                    |
//                               seedComponent                      seedComponent
//                                      |                                    |
//                                     ref                                  ref
//                                      |                                    |
//                             component (e.g. text)                component (button)
//                                      |                                    |
//                             parentComponent               parentComponent
//                                      |                                    |
//                              component (button)                    parent component
//                                      |
//                             parentComponent
//                                      |
//                               parent component

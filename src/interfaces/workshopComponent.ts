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
import { OtherSubcomponentTriggers } from './otherSubcomponentTriggers';
import { SUBCOMPONENT_TYPES } from '../consts/subcomponentTypes.enum';
import { NestedDropdownStructure } from './nestedDropdownStructure';
import { COMPONENT_STYLES } from '../consts/componentStyles.enum';
import { DropdownStaticFeatures } from './dropdownStaticFeatures';
import { COMPONENT_TYPES } from '../consts/componentTypes.enum';
import { WorkshopComponentCss } from './workshopComponentCss';
import { CoreSubcomponentRefs } from './coreSubcomponentRefs';
import { ChildComponentCount } from './childComponentCount';
import { LinkedComponents } from './linkedComponents';
import { TempCustomCss } from './tempCustomCss';
import { CloseTriggers } from './closeTriggers';
import { Animations } from './animations';
import { AutoSize } from './autoSize';
import { Icon } from './icon';
import { Sync } from './sync';

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
}

export interface Image {
  name: string;
  data: string;
  size: boolean;
}

export interface CustomStaticFeatures {
  subcomponentText?: Text;
  image?: Image;
  icon?: Icon;
  // WORK2 - should be in custom features as it is no longer part of button
  dropdown?: DropdownStaticFeatures;
}

interface TempCustomProperties {
  customCss: CustomCss;
  customFeatures?: CustomFeatures;
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
  // it is important to understand that all subcomponents from child components are moved to the masterComponent and are removed from the children
  // components. However, these subcomponents still hold a reference to the component that they originally came from using the seedComponent property.
  // full structure explained at the bottom of the file titled: 'Component Architecture Information'
  seedComponent?: WorkshopComponent;
  // this is used for overwriting css properties on mouse actions as adding css directly to customCss causes in-sync components to be edited all at once
  overwrittenCustomCssObj?: CustomCss;
  parentLayer?: Layer;
  // temporarily holds the original customCss when a component card has been hovered/selected during component import mode 
  tempOriginalCustomProperties?: TempCustomProperties;
  // this subcomponent can trigger and be triggered by other subcomponents
  otherSubcomponentTriggers?: OtherSubcomponentTriggers;
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
  // WORK2 - should restrategise and probably not needed any more
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
  // used to reference the linked component - where the base component refereneces the auxiliary component and vice versa
  linkedComponents?: LinkedComponents;
  // contains a reference to the component that nests it, e.g. if it was button text - the reference would be to button, if it was dropdown menu
  // item text - the reference would be to menu (layers are not regarded as container components to children, but can be parent components)
  // to note - container components of container components can be referred via the following name: higherComponentContainer
  containerComponent?: WorkshopComponent;
  // each seed component is assigned a reference to the master component - primarily used to access the dropdown structure
  masterComponent?: WorkshopComponent;
  sync: Sync;
  // WORK 2 - document this
  paddingComponentChild?: WorkshopComponent;
  paddingComponent?: WorkshopComponent;
}

// Component Architecture Information:

// Component:
// An entity containing information about the subcomponents that it encapsulates.

// Subcomponent:
// An entity containing information about the content and styling that it should display.


// Single subcomponent example (text component):
//
// Text Component -> Text Subcomponent
//
// Explanation:
// Text Subcomponent is accessed via subcomponents property in text component.
// Text Subcomponent is considered as a base subcomponent within the Text Component as it is
// used to define the styling for the component's infrastructure.


// Multiple subcomponents example (button component):
//
// Button Component --> { Base Subcomponent, Layer Subcomponent, Text Subcomponent }
//      |                        |                   |                   |
//      <---------<------- seedComponent       seedComponent       seedComponent
//                                                   |                   |
//                                            Layer Component      Text Component 
//
// Explanation:
// Button component is an ensamble of multiple subcomponents.
// Whilst the Base Subcomponent is owned by the Button itself, the other components are brought
// in from other components - known as seed components. Layer and Text subcomponents have their
// own seed components - whilst the Base subcomponent's seed component is the current context's
// component, which in this case is the Button (true for all base subcomponents).
// To note, Layer Subcomponent and Text Subcomponent are technically both base subcomponents
// - but are as such for their seed components and not the Button component.
// Both Layer and Text Subcomponent seed components are regarded as child components to the button
// component.


// Multiple components example (Card component):
//
// Card Component -> Layers Components -> Text/Button/Image Components etc.
//
// Explanation:
// Card Component encompasses multi-level children components.
// In this architecture, layers are children of the component card (or more accurately its base)
// and Text/Button/Image Components are children of the layer components.
// This hierarchy is defined through componentPreviewStructure -> layers -> sections -> base
// subcomponents (of the child components) -> seed component -> and the loop is repeated.
// Each seed component contains a reference to the component that owns it called 'containerComponent'.
// Hence a text component has reference to button, a button component has reference to card etc.
// To note, this property will never refer to the layer that nested the child, hence within a card
// component - the button and the layer components would both be referring to the card component.


// Linked components example (Dropdown example):
// 
// Dropdown Button Component           Dropdown Menu Component
//            |         |                          |        |
//    linkedComponents  |                  linkedComponents |
//            |         |                          |        |
//        auxiliary     <--------<-------<------ base       |
//            |                                             |
//            ----------->----------------->---------------->
//
// Explanation:
// Dropdown component encompasses two components - Button and Menu
// Button component is considered as the base component because it is the originating component
// from which the linked components (Menu) are branching from.
// Menu component is considered as an auxiliary component which branches from the Button.
// Auxiliary components are considered to have absolute position styling and are positioned somewhere
// close to the linked base component. Additionally both the base and auxiliary components hold a
// reference to each other via the 'linkedComponents' property.
// To note, a base can link to multiple auxiliary components whereas the auxiliary component
// can only be linked to one base component.
// Additionally, such links can exist within child components too.

// Master component (Dropdown example):
// 
// Dropdown Button Component -> { base, layer, text }
//    |                            |       |     |
//    |                            |       |     |
//    <---- { subcomponents, subcomponentDropdownStructure, subcomponentNameToDropdownOptionName }
//    <------------<-------------- masterComponent
//                                 |       |     |
//                                 |       |     |
// Dropdown Menu Component ---> { base, layers, text }
//
// Explanation:
// All of the dropdown's child components' (any level, incl. auxiliary component's) subcomponents,
// subcomponentDropdownStructure and subcomponentNameToDropdownOptionName property values are moved
// to the very top level component (and removed from the original components). This is carried out
// to maintain all of these values in the same place.
// Hence this component is known as the Master component and all of the seed components have a
// reference to it via the masterComponent property.
// When referring to the examples above chronologically - master components of would be the very parent
// each component i.e. Text, Button, Card and Dropdown Button components.
// To note, seed components can still refer to their core subcomponents via the coreSubcomponentRefs
// property.

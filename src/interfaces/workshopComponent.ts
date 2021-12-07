import { DisplayInFrontOfSiblingsContainerState, DisplayInFrontOfSiblingsState } from './displayInFrontOfSiblingsState';
import { InterconnectedSetting, SubcomponentSpecificSettings } from './subcomponentSpecificSettings';
import { DropdownFeatures, DropdownMenuData, SelectDropdownText } from './dropdownFeatures';
import { HORIZONTAL_ALIGNMENT_SECTIONS } from '../consts/horizontalAlignmentSections';
import { SubcomponentMouseEventCallbacks } from './subcomponentMouseEventCallbacks';
import { ComponentPreviewStructure, Layer } from './componentPreviewStructure';
import { CSS_PSEUDO_CLASSES } from '../consts/subcomponentCssClasses.enum';
import { ComponentJavascriptClasses } from './componentJavascriptClasses';
import { TriggerFuncOnSettingChange } from './triggerFuncOnSettingChange';
import { OtherSubcomponentTriggers } from './otherSubcomponentTriggers';
import { SUBCOMPONENT_TYPES } from '../consts/subcomponentTypes.enum';
import { COMPONENT_STYLES } from '../consts/componentStyles.enum';
import { ChildComponentHandlers } from './childComponentHandlers';
import { COMPONENT_TYPES } from '../consts/componentTypes.enum';
import { WorkshopComponentCss } from './workshopComponentCss';
import { SelectComponent } from './selectedChildComponent';
import { LinkedComponents } from './linkedComponents';
import { CloseTriggers } from './closeTriggers';
import { TempCustomCss } from './tempCustomCss';
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

export interface Alignment {
  horizontalSection: HORIZONTAL_ALIGNMENT_SECTIONS;
}

export interface Image {
  name: string;
  data: string;
  size: boolean;
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
  circleBorder?: boolean;
  lastSelectedCssValues?: WorkshopComponentCss;
  mouseEventCallbacks?: SubcomponentMouseEventCallbacks;
  dropdown?: DropdownFeatures;
}

interface TempCustomProperties {
  customCss: CustomCss;
  customFeatures?: CustomFeatures;
}

export interface CustomStaticFeatures {
  alignment?: Alignment;
  // WORK 2 - potentially rework selectDropdownText to use isCurrentlySelected
  // applied to the dropdown padding component
  selectDropdownText?: SelectDropdownText;
  // state management of selected child components - e.g. button group buttons
  selectComponent?: SelectComponent;
  // applied to the dropdown menu component
  dropdownMenuData?: DropdownMenuData;
  jsClasses?: ComponentJavascriptClasses;
  subcomponentText?: Text;
  image?: Image;
  icon?: Icon;
  // works with conjunction to the DisplayInFrontOfSiblingsContainerState object in the container component
  // responsible for keeping track of component's current zIndex and its changeZIndexTimeout func - used for the transition animation
  displayInFrontOfSiblingsState?: DisplayInFrontOfSiblingsState;
  // works with conjunction to the DisplayInFrontOfSiblingsState objects in container's child components 
  // responsible for keeping track of the highest zIndex among the children so as to allow the newly highlighted/clicked
  // component to appear on top whilst the blurred or unclicked components can still be above other components during their
  // transition animation
  displayInFrontOfSiblingsContainerState?: DisplayInFrontOfSiblingsContainerState;
}

export interface CustomDynamicProperties {
  customCss: CustomCss;
  defaultCss: CustomCss;
  customFeatures?: CustomFeatures;
  defaultCustomFeatures?: CustomFeatures;
  // temporarily holds the original customCss when a component card has been hovered/selected during child copy mode 
  tempOriginalCustomProperties?: TempCustomProperties;
}

export type Subcomponent = CustomDynamicProperties & {
  name: string;
  // used for defining options and adding new subcomponents to a layer
  subcomponentType?: SUBCOMPONENT_TYPES;
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
  activeCssPseudoClassesDropdownItem: CSS_PSEUDO_CLASSES;
  // the motivator for the default property is the fact that the first subcomponent css pseudo class should not be assumed to be the default one
  defaultCssPseudoClassesDropdownItem: CSS_PSEUDO_CLASSES;
  activeCssPseudoClassViaUserAction: CSS_PSEUDO_CLASSES; 
  // the reason why custom css is attached here is to not have to keep multiple unique settings for each and every subcomponent in memory all at once
  subcomponentSpecificSettings?: SubcomponentSpecificSettings;
  // features that would not be overwritten by imported child component's subcomponents
  customStaticFeatures?: CustomStaticFeatures; 
  defaultCustomStaticFeatures?: CustomStaticFeatures;
  // it is important to understand that all subcomponents from child components are moved to the masterComponent and are removed from the children
  // components. However, these subcomponents still hold a reference to the component that they originally came from using the seedComponent property.
  // full structure explained at the bottom of the file titled: 'Component Architecture Information'
  seedComponent?: WorkshopComponent;
  // this is used for overwriting css properties on mouse actions as adding css directly to customCss causes in-sync components to be edited all at once
  overwrittenCustomCssObj?: CustomCss;
  // this subcomponent can trigger and be triggered by other subcomponents
  otherSubcomponentTriggers?: OtherSubcomponentTriggers;
  // used to temporarily display a child component when hovering add subcomponent dropdown items with a mouse
  isTemporaryAddPreview?: boolean;
  isRemovable?: boolean;
}

export type Subcomponents = {
  [subcomponentName: string]: Subcomponent;
}

interface CssClasses {
  componentClasses?: Set<string>;
  containerClasses?: Set<string>;
}

export interface WorkshopComponent {
  type: COMPONENT_TYPES;
  style: COMPONENT_STYLES;
  // I have considered making this a Set of subcomponents instead of the name to properties map, but because the selection of active subcomponents
  // through the subcomponent selection dropdown in the toolbar returns a subcomponent name - pointing to the active subcomponent in the current
  // map was the simplest way to retrieve the active subcomponent
  subcomponents: Subcomponents;
  activeSubcomponentName: string;
  // the motivator for this is the fact that the first subcomponent should not be assumed to be the default one
  defaultSubcomponentName: string;
  componentPreviewStructure: ComponentPreviewStructure;
  // class name for the component
  className: string;
  // difference between these and jsClasses is that they are not used for js purposes and are not shared with child components 
  cssClasses?: CssClasses;
  baseSubcomponent: Subcomponent;
  // only on child container components
  parentLayer?: Layer;
  // gives an in sync child component to identify if the copied component has not been deleted
  componentStatus: { isRemoved: boolean };
  interconnectedSettings?: InterconnectedSetting[];
  // when a particular setting is changed (e.g. input or range) - call a particular function
  triggerFuncOnSettingChange?: TriggerFuncOnSettingChange;
  // used to reference the linked component - where the base component refereneces the auxiliary component and vice versa
  linkedComponents?: LinkedComponents;
  // contains a reference to the component that nests it, e.g. if it was button text - the reference would be to button, if it was dropdown menu
  // item text - the reference would be to menu (layers are not regarded as container components to children, but can be parent components)
  // to note - container components of container components can be referred via the following name: higherComponentContainer
  containerComponent?: WorkshopComponent;
  // each seed component is assigned a reference to the master component - primarily used to access the dropdown structure
  // contains all subcomponents and dropdown structure for all of its child components which is explained further below
  masterComponent?: WorkshopComponent;
  sync: Sync;
  paddingComponent?: WorkshopComponent;
  paddingComponentChild?: WorkshopComponent;
  // this property references components that are automatically added to layer and removed a long with it
  // it additionally helps when container component is being copied
  childComponentsLockedToThis?: WorkshopComponent[];
  // properties for performing additional functionality when adding/removing child components, also management of state that supports
  // generation of add/remove buttons
  childComponentHandlers: ChildComponentHandlers;
  onComponentDisplayFunc?: (component: WorkshopComponent) => void;
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
// 1. Explanation:
// Button component is an ensamble of multiple subcomponents.
// Whilst the Base Subcomponent is owned by the Button itself, the other components are brought
// in from other components - known as seed components. Layer and Text subcomponents have their
// own seed components - whilst the Base subcomponent's seed component is the current context's
// component, which in this case is the Button (true for all base subcomponents).
// To note, Layer Subcomponent and Text Subcomponent are technically both base subcomponents
// - but are as such for their seed components and not the Button component.
// Both Layer and Text Subcomponent seed components are regarded as child components to the button
// component.
//
// Button Component --> { Base Subcomponent, Layer Subcomponent, Text Subcomponent }
//      |                        |                   |                   |
//      --------->-------> baseSubcomponent   baseSubcomponent    baseSubcomponent
//                                                   |                   |
//                                            Layer Component      Text Component 
// 
// 2. Explanation:
// Each seed component can additionally access their base subcomponet via the baseSubcomponent
// property


// Multiple components example (Card component):
//
// Card Component -> Layers Components -> Text/Button/Image Components etc.
//
// 1. Explanation:
// Card Component encompasses multi-level children components.
// In this architecture, layers are children of the component card (or more accurately its base)
// and Text/Button/Image Components are children of the layer components.
// This hierarchy is defined through componentPreviewStructure -> layers -> alignment -> base
// subcomponents (of the child components) -> seed component -> and the loop is repeated.
// Each seed component contains a reference to the component that owns it called 'containerComponent'.
// Hence a text component has reference to button, a button component has reference to card etc.
// To note, this property will never refer to the layer that nested the child, hence within a card
// component - the button and the layer components would both be referring to the card component.
//
// 2. Explanation:
// Each container child component can access the layer that they are currently in via parentLayer
// property
//
// Card Component -> Layers Components -> Text/Button/Image Components etc.
//                         |                           |
//                         |                           |
//                         <------- parentLayer <-------



// Linked components example (Partial dropdown example - not showing the padding component):
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


// Master component (Partial dropdown example - not showing the padding component):
// 
// Dropdown Button Component -> { base, layer, text }
//    |                            |       |     |
//    |                            |       |     |
//    <---- { subcomponents, subcomponentDropdownStructure, subcomponentNameToDropdownItemName }
//    <------------<-------------- masterComponent
//                                 |       |     |
//                                 |       |     |
// Dropdown Menu Component ---> { base, layers, text }
//
// Explanation:
// All of the dropdown's child components' (any level, incl. auxiliary component's) subcomponents,
// subcomponentDropdownStructure and subcomponentNameToDropdownItemName property values are moved
// to the very top level component (and removed from the original components). This is carried out
// to maintain all of these values in the same place.
// Hence this component is known as the Master component and all of the seed components have a
// reference to it via the masterComponent property.
// When referring to the examples above chronologically - master components would be the very parent
// of each component i.e. Text, Button, Card and Dropdown Button components.


// Padding component (Partial dropdown example - only dropdown padding and dropdown button components):
//
// Dropdown Component                                                       Dropdown Button Component
//  |      |      |                                                            |       |       |
//  |      |      ------------------> paddingComponentChild ------------------->       |       |
//  |      |                                                                           |       |
//  |      <--------------------------- paddingComponent <------------------------------       |
//  |                                                                                          |
//  --> { subcomponents, subcomponentDropdownStructure, subcomponentNameToDropdownItemName } <--
//
//
// Explanation:
// 
// Primary responsibility of a padding component is to represent multiple base components at the same level.
// This is best reflected by the subcomponent selection dropdown menu (toolbar) for the dropdown component
// where upon hovering on the first item - 'Base', two components are highlighted instead - Button and Menu.
// Whilst it represents multiple components, it can only refer to one via the paddingComponentChild
// property which is the true master component of all the other children components (incl. menu as
// referenced by the examples above).
// The padding component child can  refer to the padding component via the paddingComponent property.
// It is important to understand that all of the underlying components inside the dropdown component
// refer the dropdown button component as the master component, however the padding dropdown component
// itself refers to master as itself (due to the default nature of parent-most components).
// subcomponents, subcomponentNameToDropdownItemName and subcomponentDropdownStructure property values
// in the padding dropdown and dropdown button components share the same reference due to the
// subcomponent selection dropdown being generated using the dropdown padding component, whilst
// everything else is referenced through the dropdown button component, hence sharing the same references
// allows the dropdown component to have access to the values.


// DOC: 7878
// The use of isRemoved componentStatus to lazily dereference synced children:

// Upon removing a component that has other components synced to it, instead of dereferencing all of those components
// immediately, the subject component componentStatus ref's isRemoved property is instead marked as true and the synced
// components are only dereferenced when they are actually opened up in the toolbar.
// This is carried out in order to boost performance as a component could be synced by 10s or 100s other components and if
// all of them would need to be dereferenced (incl. their own children via component preview traversal), it would be a
// very expensive computational task.
// Hence in the interest of preserving smooth user experience when using multiple components, we have opted to use this option.
// Such functionality is made available by the fact that components that are still synced post removal can never really change
// the custom properties' references as the user would need to first open them in the toolbar, and as soon as they do that
// the component is dereferenced, hence the user can't change the previously synced custom properties and all of the other
// components that are still synced will remain untouched.
// If there is an easier way to simply dereference all synced components in one go in the future, use that option instead.

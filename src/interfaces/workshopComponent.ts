import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../consts/workshopToolbarOptionTypes.enum';
import { SUB_COMPONENT_CSS_MODES } from '../consts/subcomponentCssModes.enum';
import { ComponentJavascriptClasses } from './componentJavascriptClasses';
import { NEW_COMPONENT_TYPES } from '../consts/newComponentTypes.enum';
import { PSEUDO_COMPONENTS } from '../consts/pseudoComponents.enum';
import { NestedDropdownStructure } from './nestedDropdownStructure';
import { SUB_COMPONENTS } from '../consts/subcomponentModes.enum';
import { WorkshopComponentCss } from './workshopComponentCss';
import { TempCustomCss } from './tempCustomCss';
import { InheritedCss } from './inheritedCss';

type InnerSubcomponents = { [key in PSEUDO_COMPONENTS | SUB_COMPONENTS]?: SubcomponentProperties | string };

type Layer = {
  css: WorkshopComponentCss | SubcomponentProperties;
  previewZIndex?: number;
  subcomponents: InnerSubcomponents;
  subcomponentPreviewId?: string;
}

export interface ComponentPreviewStructure {
  baseCss: SubcomponentProperties;
  // will be used in the future, can be horizontal or vertical
  layeringType?: string;
  layers?: Layer[];
  // no nested layering within
  shallowSubcomponents?: InnerSubcomponents;
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
  displayPreviewOnly?: boolean;
}

export type CustomSettings = {
  [key in WORKSHOP_TOOLBAR_OPTION_TYPES]?: {
    [cssPropertyName: string]: {
      scale?: [number, number];
    }
  };
}

export interface SubcomponentProperties {
  componentTag: string;
  customCss: CustomCss;
  initialCss: CustomCss;
  // this css is used in instances where partialCss has been overwrittern by a single value, but a fraction of it
  // must be retained for use by settings - boxShadow (to note, this is mostly used by the app in runtime)
  auxiliaryPartialCss?: CustomCss;
  // this css is used in this website only and will be removed in output file
  tempCustomCss?: TempCustomCss;
  // this css is not configured by the user and comes along with the component
  inheritedCss?: InheritedCss;
  // this css is used for nested classes or element tags e.g. .my-component div {
  // the code to export this has been removed on the 19th of Dec 2020 - commit id: f6391eb61305106001709130ce4f45877226069b, remove if all component types added and this is not needed
  descendantCss?: DescendantCss;
  // this css is used for particular nested children (.default-class-name > div:nth-child(2))
  childCss?: ChildCss[];
  customCssActiveMode: SUB_COMPONENT_CSS_MODES;
  subcomponentPreviewTransition?: string;
  jsClasses: ComponentJavascriptClasses;
  initialJsClasses: ComponentJavascriptClasses;
  optionalSubcomponent?: OptionalSubcomponent;
  // the reason why custom css is attached here is to not have to keep multiple unique settings for each and every subcomponent in memory all at once
  customSettings?: CustomSettings;
}

export type Subcomponents = {
  [property in SUB_COMPONENTS]?: SubcomponentProperties;
}

export interface WorkshopComponent {
  type: NEW_COMPONENT_TYPES;
  subcomponents: Subcomponents;
  subcomponentsActiveMode: SUB_COMPONENTS;
  componentPreviewStructure: ComponentPreviewStructure;
  className: string;
}

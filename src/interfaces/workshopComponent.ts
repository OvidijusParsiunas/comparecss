import { WorkshopComponentCss } from './workshopComponentCss';
import { NEW_COMPONENT_TYPES } from '../consts/newComponentTypes.enum';
import { InheritedCss } from './inheritedCss';
import { SUB_COMPONENT_CSS_MODES } from '../consts/subcomponentCssModes.enum';
import { ComponentJavascriptClasses } from './componentJavascriptClasses';
import { TempCustomCss } from './tempCustomCss';
import { SUB_COMPONENTS } from '../consts/subcomponentModes.enum';

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

export interface customSettingsProperties {
  width?: number[],
  height: number[],
}

export interface OptionalSubcomponent {
  currentlyDisplaying: boolean;
}

export interface SubcomponentProperties {
  frameworkClass: string;
  componentTag: string;
  innerHtmlText: string;
  customCss: CustomCss;
  initialCss: CustomCss;
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
  customSettingsProperties?: customSettingsProperties;
  optionalSubcomponent?: OptionalSubcomponent;
}

type subcomponents = {
  [property in SUB_COMPONENTS]?: SubcomponentProperties;
}

export interface WorkshopComponent {
  type: NEW_COMPONENT_TYPES;
  subcomponents: subcomponents;
  subcomponentsActiveMode: SUB_COMPONENTS,
  className: string;
}

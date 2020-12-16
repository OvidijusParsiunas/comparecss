import { WorkshopComponentCss } from './workshopComponentCss';
import { NEW_COMPONENT_TYPES } from '../consts/newComponentTypes.enum';
import { InheritedCss } from './inheritedCss';
import { SUB_COMPONENT_CSS_MODES } from '../consts/subcomponentCssModes.enum';
import { ComponentJavascriptClasses } from './componentJavascriptClasses';
import { TempCustomCss } from './tempCustomCss';
import { SUB_COMPONENTS } from '../consts/subcomponentModes.enum';

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
  descendantCss?: DescendantCss;
  customCssActiveMode: SUB_COMPONENT_CSS_MODES;
  transition: string;
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

import { WorkshopComponentCss } from './workshopComponentCss';
import { NEW_COMPONENT_TYPES } from '../consts/newComponentTypes.enum';
import { InheritedCss } from './inheritedCss';
import { SUB_COMPONENT_CSS_MODES } from '../consts/subcomponentCssModes.enum';
import { ComponentJavascriptClasses } from './componentJavascriptClasses';
import { TempCustomCss } from './tempCustomCss';
import { SUB_COMPONENTS } from '../consts/subcomponentModes.enum';

export type CustomCss = {
  [key in SUB_COMPONENT_CSS_MODES]?: WorkshopComponentCss;
}

export interface customSettingsProperties {
  width?: number[],
  height: number[],
}

export interface SubcomponentProperties {
  frameworkClass: string;
  componentTag: string;
  innerHtmlText: string;
  customCss: CustomCss;
  initialCss: CustomCss;
  tempCustomCss?: TempCustomCss;
  inheritedCss?: InheritedCss;
  customCssActiveMode?: SUB_COMPONENT_CSS_MODES;
  transition: string;
  jsClasses: ComponentJavascriptClasses;
  initialJsClasses: ComponentJavascriptClasses;
  customSettingsProperties?: customSettingsProperties;
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

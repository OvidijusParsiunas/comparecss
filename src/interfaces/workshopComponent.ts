import { WorkshopComponentCss } from './workshopComponentCss';
import { NEW_COMPONENT_TYPES } from '../consts/newComponentTypes.enum';
import { InheritedCss } from './inheritedCss';
import { COMPONENT_MODES } from '../consts/componentModes.enum';
import { ComponentJavascriptClasses } from './componentJavascriptClasses';
import { TempCustomCss } from './tempCustomCss';

export type CustomCss = {
  [key in COMPONENT_MODES]?: WorkshopComponentCss;
}

export interface ComponentProperties {
  frameworkClass: string;
  componentTag: string;
  innerHtmlText: string;
  customCss: CustomCss;
  initialCss: CustomCss;
  tempCustomCss?: TempCustomCss;
  inheritedCss?: InheritedCss;
  customCssActiveMode?: COMPONENT_MODES;
  transition: any;
  jsClasses: ComponentJavascriptClasses,
  initialJsClasses: ComponentJavascriptClasses,
}

export interface customSettingsProperties {
  width: number[],
  height: number[],
}

export interface WorkshopComponent {
  type: NEW_COMPONENT_TYPES;
  componentProperties: ComponentProperties;
  className: string;
  customSettingsProperties?: customSettingsProperties;
}

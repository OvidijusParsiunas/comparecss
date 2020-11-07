import { WorkshopComponentCss } from './workshopComponentCss';
import { BUTTON_COMPONENT_MODES } from '../consts/buttonComponentModes.enum';
import { NEW_COMPONENT_TYPES } from '../consts/newComponentTypes.enum';

export type CustomCss = {
  [key in BUTTON_COMPONENT_MODES]?: WorkshopComponentCss;
}

export interface ComponentProperties {
  frameworkClass: string;
  componentClass: string;
  innerHtml: string;
  customCss: CustomCss;
  initialCss: CustomCss;
  customCssActiveMode?: BUTTON_COMPONENT_MODES;
  transition: any;
  customJS: any,
}

export interface WorkshopComponent {
  type: NEW_COMPONENT_TYPES;
  componentProperties: ComponentProperties;
  className: string;
}

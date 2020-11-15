import { BUTTON_JAVASCRIPT_CLASSES } from '../components/content/workshop/toolbar/javascript/buttonJavaScriptClasses.enum';
import { WorkshopComponentCss } from './workshopComponentCss';
import { BUTTON_COMPONENT_MODES } from '../consts/buttonComponentModes.enum';
import { NEW_COMPONENT_TYPES } from '../consts/newComponentTypes.enum';
import { InheritedCss } from './inheritedCss';

export type CustomCss = {
  [key in BUTTON_COMPONENT_MODES]?: WorkshopComponentCss;
}

export interface ComponentProperties {
  frameworkClass: string;
  innerHtml: string;
  customCss: CustomCss;
  initialCss: CustomCss;
  tempCustomCss?: Set<string>;
  inheritedCss?: InheritedCss;
  customCssActiveMode?: BUTTON_COMPONENT_MODES;
  transition: any;
  jsClasses: BUTTON_JAVASCRIPT_CLASSES[],
  initialJsClasses: BUTTON_JAVASCRIPT_CLASSES[],
}

export interface WorkshopComponent {
  type: NEW_COMPONENT_TYPES;
  componentProperties: ComponentProperties;
  className: string;
}

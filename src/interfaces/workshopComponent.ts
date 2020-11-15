import { BUTTON_JAVASCRIPT_CLASSES } from '../components/content/workshop/toolbar/javascript/buttonJavaScriptClasses.enum';
import { WorkshopComponentCss } from './workshopComponentCss';
import { NEW_COMPONENT_TYPES } from '../consts/newComponentTypes.enum';
import { InheritedCss } from './inheritedCss';
import { COMPONENT_MODES } from '../consts/componentModes.enum';

export type CustomCss = {
  [key in COMPONENT_MODES]?: WorkshopComponentCss;
}

type COMPONENT_JS_CLASSES = BUTTON_JAVASCRIPT_CLASSES;

export interface ComponentProperties {
  frameworkClass: string;
  innerHtml: string;
  customCss: CustomCss;
  initialCss: CustomCss;
  tempCustomCss?: Set<string>;
  inheritedCss?: InheritedCss;
  customCssActiveMode?: COMPONENT_MODES;
  transition: any;
  jsClasses: COMPONENT_JS_CLASSES[],
  initialJsClasses: COMPONENT_JS_CLASSES[],
}

export interface WorkshopComponent {
  type: NEW_COMPONENT_TYPES;
  componentProperties: ComponentProperties;
  className: string;
}

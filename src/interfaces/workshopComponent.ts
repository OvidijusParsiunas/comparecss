import { WorkshopComponentCss } from './workshopComponentCss';
import { BUTTON_COMPONENT_MODES } from '../consts/buttonComponentModes.enum';

type CustomCss = {
  [key in BUTTON_COMPONENT_MODES]?: WorkshopComponentCss;
}

export interface ComponentProperties {
  frameworkClass: string;
  componentClass: string;
  innerHtml: string;
  customCss: CustomCss;
  initialCss: CustomCss;
  customCssActiveMode?: BUTTON_COMPONENT_MODES;
}

interface CardProperties {
  type: string;
}

export interface WorkshopComponent {
  cardProperties: CardProperties;
  componentProperties: ComponentProperties;
  className: string;
}
  
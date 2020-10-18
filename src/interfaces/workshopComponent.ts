import { WorkshopComponentCss } from './workshopComponentCss';

interface CardProperties {
  type: string;
}

interface ComponentProperties {
  frameworkClass: string;
  componentClass: string;
  innerHtml: string;
  customCss: WorkshopComponentCss;
}

export interface WorkshopComponent {
  cardProperties: CardProperties;
  componentProperties: ComponentProperties;
  className: string;
}
  
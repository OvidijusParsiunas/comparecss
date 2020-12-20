import { WorkshopComponentCss } from './workshopComponentCss';
import { CustomCss } from './workshopComponent';

interface SharedCssProperties {
  classes: string[],
  css: WorkshopComponentCss,
}

export interface SharedInheritedCss {
  [property: string]: SharedCssProperties;
}

export type CustomCssWithInheritedCss = [CustomCss, WorkshopComponentCss?];

export interface InitialCssBuild {
  customCss: string;
  sharedInheritedParentCss: SharedInheritedCss;
  sharedInhertedChildCss: SharedInheritedCss;
}

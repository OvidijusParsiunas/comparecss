import { WorkshopComponent } from './workshopComponent';

export interface UseIconComponent {
  isSVGIcon: (componentArg?: WorkshopComponent) => boolean;
  getSVGIconName: (componentArg?: WorkshopComponent) => string;
}

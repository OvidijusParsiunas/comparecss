import { WorkshopComponent } from '../../../interfaces/workshopComponent';
import defaultButton from '../../../newComponents/buttons/default';  

export default class NewComponentManager {
  static getNewComponentProperties(componentName: string): WorkshopComponent {
    switch (componentName) {
      // need a const for this
      case ('Button'):
        return defaultButton;
      default:
        return null;
    }
  }
}
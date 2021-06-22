import { NEW_COMPONENT_STYLES } from '../../../../../../../consts/newComponentStyles.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { Options } from '../../../../../../../interfaces/options';
import { nestedButtonOptions } from './nestedButton';
import { closeButtonOptions } from './closeButton';

export class ImportedButtonOptions {

  public static getOptions(component: WorkshopComponent): Options {
    if (component.subcomponents[component.activeSubcomponentName].importedComponent.componentRef.style === NEW_COMPONENT_STYLES.BUTTON_CLOSE) {
      return closeButtonOptions;
    }
    return nestedButtonOptions;
  }
}

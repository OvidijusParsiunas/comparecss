import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { AddNewImportedSubcomponent } from './addNewImportedSubcomponent';
import { AddNewNativeSubcomponent } from './addNewNativeSubcomponent';

export class AddNewSubcomponentUtils {
  
  public static addSubcomponent(currentlySelectedComponent: WorkshopComponent, subcomponentType = 'importedButton'): void {
    if (subcomponentType === 'importedButton') {
      AddNewImportedSubcomponent.add(currentlySelectedComponent);
    } else {
      AddNewNativeSubcomponent.add(currentlySelectedComponent);
    }
  }
}

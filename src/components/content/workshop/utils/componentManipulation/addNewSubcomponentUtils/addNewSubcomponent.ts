import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { AddNewImportedComponent } from './add/addNewImportedComponent';
import { AddNewLayerSubcomponent } from './add/addNewLayerSubcomponent';
import { AddNewSubcomponent } from './add/addNewSubcomponent';

export class AddNewSubcomponentUtils {
  
  public static addSubcomponent(currentlySelectedComponent: WorkshopComponent, subcomponentType = 'importedButton'): void {
    // WORK1: use the subcomponentType that will be passed in as arg
    if (currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].subcomponentType === SUBCOMPONENT_TYPES.BASE) {
      AddNewLayerSubcomponent.add(currentlySelectedComponent);
    } else if (subcomponentType === 'importedButton') {
      AddNewImportedComponent.add(currentlySelectedComponent);
    } else {
      AddNewSubcomponent.add(currentlySelectedComponent);
    }
  }
}

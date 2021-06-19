import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { AddNewImportedComponent } from './add/addNewImportedComponent';
import { AddNewLayerSubcomponent } from './add/addNewLayerSubcomponent';

export class AddNewSubcomponentUtils {
  
  public static addSubcomponent(currentlySelectedComponent: WorkshopComponent, subcomponentType = 'importedButton'): void {
    if (currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].subcomponentType === SUBCOMPONENT_TYPES.BASE) {
      AddNewLayerSubcomponent.add(currentlySelectedComponent);
    } else if (subcomponentType === 'importedButton') {
      AddNewImportedComponent.add(currentlySelectedComponent, SUBCOMPONENT_TYPES.TEXT);
    }
  }
}

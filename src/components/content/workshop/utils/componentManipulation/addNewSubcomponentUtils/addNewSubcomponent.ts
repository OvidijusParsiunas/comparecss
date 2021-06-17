import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { AddNewNativeSubcomponent } from './add/addNewNativeSubcomponent';
import { AddNewImportedComponent } from './add/addNewImportedComponent';
import { AddNewLayerSubcomponent } from './add/addNewLayerSubcomponent';

export class AddNewSubcomponentUtils {
  
  public static addSubcomponent(currentlySelectedComponent: WorkshopComponent, subcomponentType = 'importedButton'): void {
    if (currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].subcomponentType === SUBCOMPONENT_TYPES.BASE) {
      AddNewLayerSubcomponent.add(currentlySelectedComponent, SUBCOMPONENT_TYPES.LAYER_3);
    } else if (subcomponentType === 'importedButton') {
      AddNewImportedComponent.add(currentlySelectedComponent, SUBCOMPONENT_TYPES.TEXT);
    } else {
      AddNewNativeSubcomponent.add(currentlySelectedComponent, SUBCOMPONENT_TYPES.SECTION_TEXT);
    }
  }
}

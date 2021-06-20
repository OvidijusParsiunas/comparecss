import { NEW_COMPONENT_STYLES } from '../../../../../../consts/newComponentStyles.enum';
import { NEW_COMPONENT_TYPES } from '../../../../../../consts/newComponentTypes.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { AddNewImportedComponent } from './add/addNewImportedComponent';
import { AddNewLayerSubcomponent } from './add/addNewLayerSubcomponent';

export class AddNewSubcomponentUtils {
  
  public static addSubcomponent(currentlySelectedComponent: WorkshopComponent, subcomponentType = 'importedButton'): void {
    if (currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].subcomponentType === SUBCOMPONENT_TYPES.BASE) {
      AddNewLayerSubcomponent.add(currentlySelectedComponent);
    } else if (subcomponentType === 'importedButton') {
      AddNewImportedComponent.add(currentlySelectedComponent, NEW_COMPONENT_TYPES.TEXT, currentlySelectedComponent.activeSubcomponentName,
        NEW_COMPONENT_STYLES.BUTTON_CLOSE);
    }
  }
}

import { DEFAULT_STYLE, LAYER_STYLES } from '../../../../../../consts/componentStyles.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { COMPONENT_TYPES } from '../../../../../../consts/componentTypes.enum';
import { AddNewLayerSubcomponent } from './add/addNewLayerSubcomponent';
import { AddNewGenericComponent } from './add/addNewGenericComponent';

export class AddNewSubcomponent {
  
  public static addSubcomponent(currentlySelectedComponent: WorkshopComponent, subcomponentType = 'nestedButton'): void {
    if (currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].subcomponentType === SUBCOMPONENT_TYPES.BASE) {
      AddNewLayerSubcomponent.add(currentlySelectedComponent, LAYER_STYLES.CARD, true);
    } else if (subcomponentType === 'nestedButton') {
      AddNewGenericComponent.add(currentlySelectedComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLE.DEFAULT,
        currentlySelectedComponent.activeSubcomponentName);
    }
  }
}

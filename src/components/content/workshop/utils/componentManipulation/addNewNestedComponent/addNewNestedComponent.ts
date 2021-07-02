import { DEFAULT_STYLE, LAYER_STYLES } from '../../../../../../consts/componentStyles.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { COMPONENT_TYPES } from '../../../../../../consts/componentTypes.enum';
import { AddNewGenericComponent } from './add/addNewGenericComponent';
import { AddNewLayerComponent } from './add/addNewLayerComponent';

export class AddNewNestedComponent {
  
  public static add(currentlySelectedComponent: WorkshopComponent, subcomponentType = 'nestedButton'): void {
    if (currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].subcomponentType === SUBCOMPONENT_TYPES.BASE) {
      AddNewLayerComponent.add(currentlySelectedComponent, LAYER_STYLES.CARD, true);
    } else if (subcomponentType === 'nestedButton') {
      AddNewGenericComponent.add(currentlySelectedComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLE.DEFAULT,
        currentlySelectedComponent.activeSubcomponentName);
    }
  }
}

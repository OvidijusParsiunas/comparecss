import { BUTTON_STYLES, DEFAULT_STYLES, LAYER_STYLES } from '../../../../../../consts/componentStyles.enum';
import { AddTemporaryAddPreviewGenericComponent } from './add/addTemporaryAddPreviewGenericComponent';
import { NESTED_COMPONENTS_BASE_NAMES } from '../../../../../../consts/baseSubcomponentNames.enum';
import { AddTemporaryAddPreviewLayerComponent } from './add/addTemporaryAddPreviewLayerComponent';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { AddNewGenericComponent } from './add/addNewGenericComponent';

export class AddTemporaryAddPreviewComponent {

  public static add(currentlySelectedComponent: WorkshopComponent, nestedComponentBaseName: NESTED_COMPONENTS_BASE_NAMES): void {
    if (currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].subcomponentType === SUBCOMPONENT_TYPES.BASE
        && nestedComponentBaseName === NESTED_COMPONENTS_BASE_NAMES.LAYER) {
      AddTemporaryAddPreviewLayerComponent.add(currentlySelectedComponent, LAYER_STYLES.CARD, true);
    } else {
      const activeSubcomponentName = currentlySelectedComponent.activeSubcomponentName === currentlySelectedComponent.coreSubcomponentNames.base
        ? currentlySelectedComponent.componentPreviewStructure.layers[0].name : currentlySelectedComponent.activeSubcomponentName;
      const nestedComponentType = AddNewGenericComponent.componentBaseNameToType[nestedComponentBaseName];
      const nestedComponentStyle = nestedComponentBaseName === NESTED_COMPONENTS_BASE_NAMES.CLOSE ? BUTTON_STYLES.CLOSE : DEFAULT_STYLES.DEFAULT;
      AddTemporaryAddPreviewGenericComponent.add(currentlySelectedComponent, nestedComponentType, nestedComponentStyle, activeSubcomponentName);
    }
  }
}

import { GENERIC_COMPONENTS_BASE_NAMES, LAYER_COMPONENTS_BASE_NAMES, NESTED_COMPONENTS_BASE_NAMES } from '../../../../../../consts/baseSubcomponentNames.enum';
import { BUTTON_STYLES, DEFAULT_STYLES, LAYER_STYLES } from '../../../../../../consts/componentStyles.enum';
import { AddTemporaryAddPreviewGenericComponent } from './add/addTemporaryAddPreviewGenericComponent';
import { AddTemporaryAddPreviewLayerComponent } from './add/addTemporaryAddPreviewLayerComponent';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { AddNewGenericComponent } from './add/addNewGenericComponent';

export class AddTemporaryAddPreviewComponent {

  public static add(currentlySelectedComponent: WorkshopComponent, nestedComponentBaseName: NESTED_COMPONENTS_BASE_NAMES): void {
    if (Object.values(LAYER_COMPONENTS_BASE_NAMES).includes(nestedComponentBaseName as LAYER_COMPONENTS_BASE_NAMES)) {
      AddTemporaryAddPreviewLayerComponent.add(currentlySelectedComponent, nestedComponentBaseName === LAYER_COMPONENTS_BASE_NAMES.DROPDOWN_MENU_ITEM ? LAYER_STYLES.DROPDOWN_ITEM : LAYER_STYLES.CARD, true);
    } else {
      const activeSubcomponentName = currentlySelectedComponent.activeSubcomponentName === currentlySelectedComponent.coreSubcomponentNames.base
        ? currentlySelectedComponent.componentPreviewStructure.layers[0].name : currentlySelectedComponent.activeSubcomponentName;
      const nestedComponentType = AddNewGenericComponent.componentBaseNameToType[nestedComponentBaseName];
      const nestedComponentStyle = nestedComponentBaseName === GENERIC_COMPONENTS_BASE_NAMES.CLOSE ? BUTTON_STYLES.CLOSE : DEFAULT_STYLES.DEFAULT;
      AddTemporaryAddPreviewGenericComponent.add(currentlySelectedComponent, nestedComponentType, nestedComponentStyle, activeSubcomponentName);
    }
  }
}

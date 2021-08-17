import { LAYER_COMPONENTS_BASE_NAMES, NESTED_COMPONENTS_BASE_NAMES } from '../../../../../../consts/baseSubcomponentNames.enum';
import { AddTemporaryAddPreviewGenericComponent } from './add/addTemporaryAddPreviewGenericComponent';
import { AddTemporaryAddPreviewLayerComponent } from './add/addTemporaryAddPreviewLayerComponent';
import { NestedComponentBaseNamesToStyles } from './utils/nestedComponentBaseNamesToStyles';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { COMPONENT_TYPES } from '../../../../../../consts/componentTypes.enum';
import { AddNewGenericComponent } from './add/addNewGenericComponent';

export class AddTemporaryAddPreviewComponent {

  public static add(currentlySelectedComponent: WorkshopComponent, nestedComponentBaseName: NESTED_COMPONENTS_BASE_NAMES): void {
    // WORK1
    const selectedNestedComponent = currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].nestedComponent.ref;
    if (Object.values(LAYER_COMPONENTS_BASE_NAMES).includes(nestedComponentBaseName as LAYER_COMPONENTS_BASE_NAMES)) {
      AddTemporaryAddPreviewLayerComponent.add(selectedNestedComponent, NestedComponentBaseNamesToStyles.LAYER_TO_STYLE[nestedComponentBaseName], true);
    } else {
      const nestedComponentType = AddNewGenericComponent.componentBaseNameToType[nestedComponentBaseName];
      const nestedComponentStyle = NestedComponentBaseNamesToStyles.genericToStyle(nestedComponentBaseName);
      const parentNestedComponent = selectedNestedComponent.type === COMPONENT_TYPES.LAYER
        ? selectedNestedComponent.nestedComponentParent : selectedNestedComponent;
      const name = selectedNestedComponent.type === COMPONENT_TYPES.LAYER
        ? selectedNestedComponent.coreSubcomponentRefs[0].name : selectedNestedComponent.componentPreviewStructure.layers[0].name;
      AddTemporaryAddPreviewGenericComponent.add(parentNestedComponent, nestedComponentType, nestedComponentStyle, name);
    }
  }
}

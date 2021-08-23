import { LAYER_COMPONENTS_BASE_NAMES, NESTED_COMPONENTS_BASE_NAMES } from '../../../../../../consts/baseSubcomponentNames.enum';
import { AddTemporaryAddPreviewGenericComponent } from './add/addTemporaryAddPreviewGenericComponent';
import { AddTemporaryAddPreviewLayerComponent } from './add/addTemporaryAddPreviewLayerComponent';
import { NestedComponentBaseNamesToStyles } from './utils/nestedComponentBaseNamesToStyles';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';

export class AddTemporaryAddPreviewComponent {

  public static add(currentlySelectedComponent: WorkshopComponent, nestedComponentBaseName: NESTED_COMPONENTS_BASE_NAMES): void {
    const selectedNestedComponent = currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].seedComponent.ref;
    if (Object.values(LAYER_COMPONENTS_BASE_NAMES).includes(nestedComponentBaseName as LAYER_COMPONENTS_BASE_NAMES)) {
      AddTemporaryAddPreviewLayerComponent.add(selectedNestedComponent, NestedComponentBaseNamesToStyles.LAYER_TO_STYLE[nestedComponentBaseName], true);
    } else {
      AddTemporaryAddPreviewGenericComponent.addTemporary(selectedNestedComponent, nestedComponentBaseName);
    }
  }
}

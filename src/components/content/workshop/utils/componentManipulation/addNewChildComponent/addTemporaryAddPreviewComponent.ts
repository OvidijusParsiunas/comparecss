import { LAYER_COMPONENTS_BASE_NAMES, CHILD_COMPONENTS_BASE_NAMES } from '../../../../../../consts/baseSubcomponentNames.enum';
import { AddTemporaryAddPreviewGenericComponent } from './add/addTemporaryAddPreviewGenericComponent';
import { AddTemporaryAddPreviewLayerComponent } from './add/addTemporaryAddPreviewLayerComponent';
import { ChildComponentBaseNamesToStyles } from './utils/childComponentBaseNamesToStyles';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';

export class AddTemporaryAddPreviewComponent {

  public static add(currentlySelectedComponent: WorkshopComponent, childComponentBaseName: CHILD_COMPONENTS_BASE_NAMES): void {
    const selectedSeedComponent = currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].seedComponent.ref;
    if (Object.values(LAYER_COMPONENTS_BASE_NAMES).includes(childComponentBaseName as LAYER_COMPONENTS_BASE_NAMES)) {
      AddTemporaryAddPreviewLayerComponent.add(selectedSeedComponent, ChildComponentBaseNamesToStyles.LAYER_TO_STYLE[childComponentBaseName], true);
    } else {
      AddTemporaryAddPreviewGenericComponent.addTemporary(selectedSeedComponent, childComponentBaseName);
    }
  }
}

import { LAYER_COMPONENTS_BASE_NAMES, CHILD_COMPONENTS_BASE_NAMES } from '../../../../../../consts/baseSubcomponentNames.enum';
import { AddTemporaryAddPreviewGenericComponent } from './add/addTemporaryAddPreviewGenericComponent';
import { AddTemporaryAddPreviewLayerComponent } from './add/addTemporaryAddPreviewLayerComponent';
import { ChildComponentBaseNamesToStyles } from './utils/childComponentBaseNamesToStyles';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';

export class AddTemporaryAddPreviewComponent {

  public static add(masterComponent: WorkshopComponent, newComponentBaseName: CHILD_COMPONENTS_BASE_NAMES): void {
    const activeComponent = masterComponent.subcomponents[masterComponent.activeSubcomponentName].seedComponent;
    if (Object.values(LAYER_COMPONENTS_BASE_NAMES).includes(newComponentBaseName as LAYER_COMPONENTS_BASE_NAMES)) {
      AddTemporaryAddPreviewLayerComponent.addTemporary(activeComponent, ChildComponentBaseNamesToStyles.LAYER_TO_STYLE[newComponentBaseName], true);
    } else {
      AddTemporaryAddPreviewGenericComponent.addTemporary(activeComponent, newComponentBaseName);
    }
  }
}

import { LAYER_COMPONENTS_BASE_NAMES, NESTED_COMPONENTS_BASE_NAMES } from '../../../../../../consts/baseSubcomponentNames.enum';
import { AddTemporaryAddPreviewGenericComponent } from './add/addTemporaryAddPreviewGenericComponent';
import { AddTemporaryAddPreviewLayerComponent } from './add/addTemporaryAddPreviewLayerComponent';
import { NestedComponentBaseNamesToStyles } from './utils/nestedComponentBaseNamesToStyles';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { AddNewGenericComponent } from './add/addNewGenericComponent';

export class AddTemporaryAddPreviewComponent {

  public static add(currentlySelectedComponent: WorkshopComponent, nestedComponentBaseName: NESTED_COMPONENTS_BASE_NAMES): void {
    if (Object.values(LAYER_COMPONENTS_BASE_NAMES).includes(nestedComponentBaseName as LAYER_COMPONENTS_BASE_NAMES)) {
      AddTemporaryAddPreviewLayerComponent.add(currentlySelectedComponent, NestedComponentBaseNamesToStyles.LAYER_TO_STYLE[nestedComponentBaseName], true);
    } else {
      const activeSubcomponentName = currentlySelectedComponent.activeSubcomponentName === currentlySelectedComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name
        ? currentlySelectedComponent.componentPreviewStructure.layers[0].name : currentlySelectedComponent.activeSubcomponentName;
      const nestedComponentType = AddNewGenericComponent.componentBaseNameToType[nestedComponentBaseName];
      const nestedComponentStyle = NestedComponentBaseNamesToStyles.genericToStyle(nestedComponentBaseName);
      AddTemporaryAddPreviewGenericComponent.add(currentlySelectedComponent, nestedComponentType, nestedComponentStyle, activeSubcomponentName);
    }
  }
}

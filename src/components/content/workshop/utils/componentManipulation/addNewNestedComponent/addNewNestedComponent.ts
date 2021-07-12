import { UpdateGenericComponentNames } from '../updateNestedComponentNames/updateGenericComponentNames';
import { UpdateLayerComponentNames } from '../updateNestedComponentNames/updateLayerComponentNames';
import { ComponentPreviewStructureSearchUtils } from './utils/componentPreviewStractureSearchUtils';
import { DEFAULT_STYLES, LAYER_STYLES } from '../../../../../../consts/componentStyles.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { COMPONENT_TYPES } from '../../../../../../consts/componentTypes.enum';
import { AddNewGenericComponent } from './add/addNewGenericComponent';
import { AddNewLayerComponent } from './add/addNewLayerComponent';

export class AddNewNestedComponent {

  private static updateGenericComponentNames(currentlySelectedComponent: WorkshopComponent): void {
    const parentLayer = ComponentPreviewStructureSearchUtils.getLayerByName(currentlySelectedComponent, currentlySelectedComponent.activeSubcomponentName);
    UpdateGenericComponentNames.updateViaLayerObject(currentlySelectedComponent, parentLayer);
  }

  private static updateLayerComponentNames(currentlySelectedComponent: WorkshopComponent): void {
    const layerComponentsNames = Object.keys(ComponentPreviewStructureSearchUtils.getComponentLayers(currentlySelectedComponent));
    const startingLayerNumber = layerComponentsNames.length === 2 ? 1 : layerComponentsNames.length;
    UpdateLayerComponentNames.update(currentlySelectedComponent, startingLayerNumber);
  }

  public static add(currentlySelectedComponent: WorkshopComponent, subcomponentType = 'nestedButton'): void {
    if (currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].subcomponentType === SUBCOMPONENT_TYPES.BASE) {
      AddNewLayerComponent.add(currentlySelectedComponent, LAYER_STYLES.CARD, true);
      AddNewNestedComponent.updateLayerComponentNames(currentlySelectedComponent);
    } else if (subcomponentType === 'nestedButton') {
      AddNewGenericComponent.add(currentlySelectedComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLES.DEFAULT,
        currentlySelectedComponent.activeSubcomponentName);
      AddNewNestedComponent.updateGenericComponentNames(currentlySelectedComponent);
    }
  }
}

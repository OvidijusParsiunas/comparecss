import { UpdateGenericComponentNames } from '../updateNestedComponentNames/updateGenericComponentNames';
import { UpdateLayerComponentNames } from '../updateNestedComponentNames/updateLayerComponentNames';
import { DEFAULT_STYLES, LAYER_STYLES } from '../../../../../../consts/componentStyles.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { COMPONENT_TYPES } from '../../../../../../consts/componentTypes.enum';
import { AddNewGenericComponent } from './add/addNewGenericComponent';
import { AddNewLayerComponent } from './add/addNewLayerComponent';

export class AddNewNestedComponent {
  
  public static add(currentlySelectedComponent: WorkshopComponent, subcomponentType = 'nestedButton'): void {
    if (currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].subcomponentType === SUBCOMPONENT_TYPES.BASE) {
      AddNewLayerComponent.add(currentlySelectedComponent, LAYER_STYLES.CARD, true);
      // WORK2: check if this is needed
      const { coreSubcomponentNames: { base }, componentPreviewStructure: { subcomponentDropdownStructure } } = currentlySelectedComponent;
      const layerComponents = subcomponentDropdownStructure[base];
      const layerComponentsNames = Object.keys(layerComponents);
      const newIndex = layerComponentsNames.length - 1 === 1 ? layerComponentsNames.length - 1 : layerComponentsNames.length;
      UpdateLayerComponentNames.update(currentlySelectedComponent, newIndex);
    } else if (subcomponentType === 'nestedButton') {
      AddNewGenericComponent.add(currentlySelectedComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLES.DEFAULT,
        currentlySelectedComponent.activeSubcomponentName);
      // change findParentLayer to private if not required here
      const parentLayer = AddNewGenericComponent.findParentLayer(currentlySelectedComponent, currentlySelectedComponent.activeSubcomponentName);
      const { subcomponentDropdownStructure } = currentlySelectedComponent.componentPreviewStructure;
      const parentComponentBaseName = Object.keys(subcomponentDropdownStructure)[0];
      const nestedComponents = subcomponentDropdownStructure[parentComponentBaseName][parentLayer.name];
      if (!nestedComponents) return;
      UpdateGenericComponentNames.update(currentlySelectedComponent, nestedComponents, parentLayer.sections.alignedSections);
    }
  }
}

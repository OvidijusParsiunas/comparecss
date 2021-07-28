import { UpdateGenericComponentDropdownOptionNames } from '../updateNestedComponentNames/updateGenericComponentDropdownOptionNames';
import { UpdateLayerDropdownOptionNames } from '../updateNestedComponentNames/updateLayerDropdownOptionNames';
import { BUTTON_STYLES, DEFAULT_STYLES, LAYER_STYLES } from '../../../../../../consts/componentStyles.enum';
import { ComponentPreviewStructureSearchUtils } from './utils/componentPreviewStractureSearchUtils';
import { NESTED_COMPONENTS_BASE_NAMES } from '../../../../../../consts/baseSubcomponentNames.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { AddNewGenericComponent } from './add/addNewGenericComponent';
import { AddNewLayerComponent } from './add/addNewLayerComponent';

export class AddNewNestedComponent {

  private static addNewSubcomponent(currentlySelectedComponent: WorkshopComponent, nestedComponentBaseName: NESTED_COMPONENTS_BASE_NAMES,
      layerName: string): void {
    const nestedComponentType = AddNewGenericComponent.componentBaseNameToType[nestedComponentBaseName];
    const nestedComponentStyle = nestedComponentBaseName === NESTED_COMPONENTS_BASE_NAMES.CLOSE ? BUTTON_STYLES.CLOSE : DEFAULT_STYLES.DEFAULT;
    AddNewGenericComponent.add(currentlySelectedComponent, nestedComponentType, nestedComponentStyle, layerName);
  }

  private static updateGenericComponentNames(currentlySelectedComponent: WorkshopComponent): void {
    const parentLayer = ComponentPreviewStructureSearchUtils.getLayerByName(currentlySelectedComponent,
      currentlySelectedComponent.activeSubcomponentName);
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(currentlySelectedComponent, parentLayer);
  }

  private static addNewSubcomponentToCurrentLayer(currentlySelectedComponent: WorkshopComponent, nestedComponentBaseName: NESTED_COMPONENTS_BASE_NAMES): void {
    AddNewNestedComponent.addNewSubcomponent(currentlySelectedComponent, nestedComponentBaseName, currentlySelectedComponent.activeSubcomponentName);
    AddNewNestedComponent.updateGenericComponentNames(currentlySelectedComponent);  
  }

  private static addNewSubcomponentToDefaultBaseLayer(currentlySelectedComponent: WorkshopComponent, nestedComponentBaseName: NESTED_COMPONENTS_BASE_NAMES): void {
    const defaultLayer = currentlySelectedComponent.componentPreviewStructure.layers[0];
    AddNewNestedComponent.addNewSubcomponent(currentlySelectedComponent, nestedComponentBaseName, defaultLayer.name);
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(currentlySelectedComponent, defaultLayer);
  }

  private static updateLayerComponentNames(currentlySelectedComponent: WorkshopComponent): void {
    const layerComponentsNames = Object.keys(ComponentPreviewStructureSearchUtils.getComponentLayers(currentlySelectedComponent));
    const startingIndex = layerComponentsNames.length === 2 ? 0 : layerComponentsNames.length - 1;
    UpdateLayerDropdownOptionNames.update(currentlySelectedComponent, startingIndex);
  }

  private static addNewLayerToBase(currentlySelectedComponent: WorkshopComponent): void {
    AddNewLayerComponent.add(currentlySelectedComponent, LAYER_STYLES.CARD, true);
    AddNewNestedComponent.updateLayerComponentNames(currentlySelectedComponent);
  }

  public static add(currentlySelectedComponent: WorkshopComponent, nestedComponentBaseName: NESTED_COMPONENTS_BASE_NAMES): void {
    if (currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].subcomponentType === SUBCOMPONENT_TYPES.BASE
        && nestedComponentBaseName === NESTED_COMPONENTS_BASE_NAMES.LAYER) {
      AddNewNestedComponent.addNewLayerToBase(currentlySelectedComponent);
    } else if (currentlySelectedComponent.activeSubcomponentName === currentlySelectedComponent.coreSubcomponentNames.base) {
      AddNewNestedComponent.addNewSubcomponentToDefaultBaseLayer(currentlySelectedComponent, nestedComponentBaseName);
    } else {
      AddNewNestedComponent.addNewSubcomponentToCurrentLayer(currentlySelectedComponent, nestedComponentBaseName);
    }
  }
}

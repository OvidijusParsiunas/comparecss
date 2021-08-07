import { UpdateGenericComponentDropdownOptionNames } from '../updateNestedComponentNames/updateGenericComponentDropdownOptionNames';
import { LAYER_COMPONENTS_BASE_NAMES, NESTED_COMPONENTS_BASE_NAMES } from '../../../../../../consts/baseSubcomponentNames.enum';
import { UpdateLayerDropdownOptionNames } from '../updateNestedComponentNames/updateLayerDropdownOptionNames';
import { ComponentPreviewStructureSearchUtils } from './utils/componentPreviewStractureSearchUtils';
import { NestedComponentBaseNamesToStyles } from './utils/nestedComponentBaseNamesToStyles';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { AddNewGenericComponent } from './add/addNewGenericComponent';
import { AddNewLayerComponent } from './add/addNewLayerComponent';

export class AddNewNestedComponent {

  private static addNewSubcomponent(currentlySelectedComponent: WorkshopComponent, nestedComponentBaseName: NESTED_COMPONENTS_BASE_NAMES,
      layerName: string): void {
    const nestedComponentType = AddNewGenericComponent.componentBaseNameToType[nestedComponentBaseName];
    const nestedComponentStyle = NestedComponentBaseNamesToStyles.genericToStyle(nestedComponentBaseName);
    const newComponent = AddNewGenericComponent.add(currentlySelectedComponent, nestedComponentType, nestedComponentStyle, layerName);
    // set here because not all nested components are removable, but the ones added by the user are 
    newComponent.subcomponents[newComponent.coreSubcomponentNames.base].isRemovable = true;
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

  private static addNewLayerToBase(currentlySelectedComponent: WorkshopComponent, nestedComponentBaseName: string): void {
    const newComponent = AddNewLayerComponent.add(currentlySelectedComponent, NestedComponentBaseNamesToStyles.LAYER_TO_STYLE[nestedComponentBaseName], true);
    newComponent.subcomponents[newComponent.coreSubcomponentNames.base].isRemovable = true;
    AddNewNestedComponent.updateLayerComponentNames(currentlySelectedComponent);
    newComponent.nestedComponentsLockedToLayer?.add(currentlySelectedComponent);
  }

  public static add(currentlySelectedComponent: WorkshopComponent, nestedComponentBaseName: NESTED_COMPONENTS_BASE_NAMES): void {
    if (Object.values(LAYER_COMPONENTS_BASE_NAMES).includes(nestedComponentBaseName as LAYER_COMPONENTS_BASE_NAMES)) {
      AddNewNestedComponent.addNewLayerToBase(currentlySelectedComponent, nestedComponentBaseName);
    } else if (currentlySelectedComponent.activeSubcomponentName === currentlySelectedComponent.coreSubcomponentNames.base) {
      AddNewNestedComponent.addNewSubcomponentToDefaultBaseLayer(currentlySelectedComponent, nestedComponentBaseName);
    } else {
      AddNewNestedComponent.addNewSubcomponentToCurrentLayer(currentlySelectedComponent, nestedComponentBaseName);
    }
  }
}

import { UpdateGenericComponentDropdownOptionNames } from '../updateNestedComponentNames/updateGenericComponentDropdownOptionNames';
import { LAYER_COMPONENTS_BASE_NAMES, NESTED_COMPONENTS_BASE_NAMES } from '../../../../../../consts/baseSubcomponentNames.enum';
import { UpdateLayerDropdownOptionNames } from '../updateNestedComponentNames/updateLayerDropdownOptionNames';
import { ComponentPreviewStructureSearchUtils } from './utils/componentPreviewStractureSearchUtils';
import { NestedComponentBaseNamesToStyles } from './utils/nestedComponentBaseNamesToStyles';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { COMPONENT_TYPES } from '../../../../../../consts/componentTypes.enum';
import { AddNewGenericComponent } from './add/addNewGenericComponent';
import { AddNewLayerComponent } from './add/addNewLayerComponent';

export class AddNewNestedComponent {

  private static addNewSubcomponent(currentlySelectedComponent: WorkshopComponent, nestedComponentBaseName: NESTED_COMPONENTS_BASE_NAMES,
      layerName: string): void {
    const nestedComponentType = AddNewGenericComponent.componentBaseNameToType[nestedComponentBaseName];
    const nestedComponentStyle = NestedComponentBaseNamesToStyles.genericToStyle(nestedComponentBaseName);
    const newComponent = AddNewGenericComponent.add(currentlySelectedComponent, nestedComponentType, nestedComponentStyle, layerName);
    // set here because not all nested components are removable, but the ones added by the user are
    newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
  }

  private static updateGenericComponentDropdownOptionNames(currentlySelectedComponent: WorkshopComponent): void {
    const parentLayer = ComponentPreviewStructureSearchUtils.getLayerByName(currentlySelectedComponent,
      currentlySelectedComponent.activeSubcomponentName);
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(currentlySelectedComponent, parentLayer);
  }

  private static addNewSubcomponentToCurrentLayer(currentlySelectedComponent: WorkshopComponent, nestedComponentBaseName: NESTED_COMPONENTS_BASE_NAMES): void {
    AddNewNestedComponent.addNewSubcomponent(currentlySelectedComponent, nestedComponentBaseName, currentlySelectedComponent.activeSubcomponentName);
    AddNewNestedComponent.updateGenericComponentDropdownOptionNames(currentlySelectedComponent);
  }

  private static addNewSubcomponentToDefaultBaseLayer(currentlySelectedComponent: WorkshopComponent, nestedComponentBaseName: NESTED_COMPONENTS_BASE_NAMES): void {
    // WORK1
    const defaultLayer = currentlySelectedComponent.type === COMPONENT_TYPES.LAYER
      ? ComponentPreviewStructureSearchUtils.getLayerByName(currentlySelectedComponent.nestedComponentParent, currentlySelectedComponent.coreSubcomponentRefs[0].name)
      : currentlySelectedComponent.componentPreviewStructure.layers[0];
    const component = currentlySelectedComponent.type === COMPONENT_TYPES.LAYER
      ? currentlySelectedComponent.nestedComponentParent
      : currentlySelectedComponent;
    AddNewNestedComponent.addNewSubcomponent(component, nestedComponentBaseName, defaultLayer.name);
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(component, defaultLayer);
  }

  private static updateLayerComponentNames(currentlySelectedComponent: WorkshopComponent): void {
    const layerComponentsNames = Object.keys(ComponentPreviewStructureSearchUtils.getComponentLayers(currentlySelectedComponent));
    const startingIndex = layerComponentsNames.length === 2 ? 0 : layerComponentsNames.length - 1;
    UpdateLayerDropdownOptionNames.update(currentlySelectedComponent, startingIndex);
  }

  private static addNewLayerToBase(currentlySelectedComponent: WorkshopComponent, nestedComponentBaseName: string): void {
    const newComponent = AddNewLayerComponent.add(currentlySelectedComponent, NestedComponentBaseNamesToStyles.LAYER_TO_STYLE[nestedComponentBaseName], true);
    newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
    AddNewNestedComponent.updateLayerComponentNames(currentlySelectedComponent);
    newComponent.nestedComponentsLockedToLayer?.add(currentlySelectedComponent);
  }

  public static add(currentlySelectedComponent: WorkshopComponent, nestedComponentBaseName: NESTED_COMPONENTS_BASE_NAMES): void {
    const selectedNestedComponent = currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].nestedComponent.ref;
    if (Object.values(LAYER_COMPONENTS_BASE_NAMES).includes(nestedComponentBaseName as LAYER_COMPONENTS_BASE_NAMES)) {
      AddNewNestedComponent.addNewLayerToBase(selectedNestedComponent, nestedComponentBaseName);
    } else if (selectedNestedComponent.activeSubcomponentName === selectedNestedComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name) {
      AddNewNestedComponent.addNewSubcomponentToDefaultBaseLayer(selectedNestedComponent, nestedComponentBaseName);
    } else {
      // WORK1 probably not needed
      AddNewNestedComponent.addNewSubcomponentToCurrentLayer(selectedNestedComponent, nestedComponentBaseName);
    }
  }
}

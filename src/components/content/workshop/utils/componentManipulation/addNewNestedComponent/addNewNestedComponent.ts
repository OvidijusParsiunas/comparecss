import { UpdateGenericComponentDropdownOptionNames } from '../updateNestedComponentNames/updateGenericComponentDropdownOptionNames';
import { LAYER_COMPONENTS_BASE_NAMES, NESTED_COMPONENTS_BASE_NAMES } from '../../../../../../consts/baseSubcomponentNames.enum';
import { UpdateLayerDropdownOptionNames } from '../updateNestedComponentNames/updateLayerDropdownOptionNames';
import { ComponentPreviewStructureSearchUtils } from './utils/componentPreviewStractureSearchUtils';
import { NestedComponentBaseNamesToStyles } from './utils/nestedComponentBaseNamesToStyles';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ActiveComponentUtils } from '../../activeComponent/activeComponentUtils';
import { AddNewGenericComponent } from './add/addNewGenericComponent';
import { AddNewLayerComponent } from './add/addNewLayerComponent';

export class AddNewNestedComponent {

  private static addNewSubcomponent(selectedNestedComponent: WorkshopComponent, nestedComponentBaseName: NESTED_COMPONENTS_BASE_NAMES,
      layerName: string): void {
    const nestedComponentType = AddNewGenericComponent.componentBaseNameToType[nestedComponentBaseName];
    const nestedComponentStyle = NestedComponentBaseNamesToStyles.genericToStyle(nestedComponentBaseName);
    const newComponent = AddNewGenericComponent.add(selectedNestedComponent, nestedComponentType, nestedComponentStyle, layerName);
    // set here because not all nested components are removable, but the ones added by the user are
    newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
  }

  private static updateGenericComponentDropdownOptionNames(selectedNestedComponent: WorkshopComponent): void {
    const parentLayer = ComponentPreviewStructureSearchUtils.getLayerByName(selectedNestedComponent,
      selectedNestedComponent.activeSubcomponentName);
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(selectedNestedComponent, parentLayer);
  }

  private static addNewSubcomponentToCurrentLayer(selectedNestedComponent: WorkshopComponent, nestedComponentBaseName: NESTED_COMPONENTS_BASE_NAMES): void {
    AddNewNestedComponent.addNewSubcomponent(selectedNestedComponent, nestedComponentBaseName, selectedNestedComponent.activeSubcomponentName);
    AddNewNestedComponent.updateGenericComponentDropdownOptionNames(selectedNestedComponent);
  }

  private static addNewSubcomponentToDefaultBaseLayer(selectedNestedComponent: WorkshopComponent, nestedComponentBaseName: NESTED_COMPONENTS_BASE_NAMES): void {
    const { parentNestedComponent, parentLayer } = ActiveComponentUtils.getParentComponentProperties(selectedNestedComponent, true);
    AddNewNestedComponent.addNewSubcomponent(parentNestedComponent, nestedComponentBaseName, parentLayer.name);
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(parentNestedComponent, parentLayer);
  }

  private static updateLayerComponentNames(selectedNestedComponent: WorkshopComponent): void {
    const layerComponentsNames = Object.keys(ComponentPreviewStructureSearchUtils.getComponentLayers(selectedNestedComponent));
    const startingIndex = layerComponentsNames.length === 2 ? 0 : layerComponentsNames.length - 1;
    UpdateLayerDropdownOptionNames.update(selectedNestedComponent, startingIndex);
  }

  private static addNewLayerToBase(selectedNestedComponent: WorkshopComponent, nestedComponentBaseName: string): void {
    const newComponent = AddNewLayerComponent.add(selectedNestedComponent, NestedComponentBaseNamesToStyles.LAYER_TO_STYLE[nestedComponentBaseName], true);
    newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
    AddNewNestedComponent.updateLayerComponentNames(selectedNestedComponent);
    newComponent.nestedComponentsLockedToLayer?.add(selectedNestedComponent);
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

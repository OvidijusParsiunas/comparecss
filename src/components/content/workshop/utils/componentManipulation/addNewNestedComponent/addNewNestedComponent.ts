import { UpdateGenericComponentDropdownOptionNames } from '../updateNestedComponentNames/updateGenericComponentDropdownOptionNames';
import { LAYER_COMPONENTS_BASE_NAMES, NESTED_COMPONENTS_BASE_NAMES } from '../../../../../../consts/baseSubcomponentNames.enum';
import { UpdateLayerDropdownOptionNames } from '../updateNestedComponentNames/updateLayerDropdownOptionNames';
import { ComponentPreviewStructureSearchUtils } from './utils/componentPreviewStractureSearchUtils';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { NestedComponentBaseNamesToStyles } from './utils/nestedComponentBaseNamesToStyles';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { Layer } from '../../../../../../interfaces/componentPreviewStructure';
import { AddNewGenericComponent } from './add/addNewGenericComponent';
import { AddNewComponentShared } from './add/addNewComponentShared';
import { AddNewLayerComponent } from './add/addNewLayerComponent';

export class AddNewNestedComponent extends AddNewComponentShared {

  private static addNewComponent(selectedNestedComponent: WorkshopComponent, nestedComponentBaseName: NESTED_COMPONENTS_BASE_NAMES,
      activeBaseComponent: WorkshopComponent, dropdownStructure: NestedDropdownStructure): [WorkshopComponent, Layer] {
    const { componentType, componentStyle, parentLayer, parentComponent }
      = AddNewGenericComponent.getNewComponentProperties(selectedNestedComponent, nestedComponentBaseName);
    const newComponent = AddNewGenericComponent.addUsingParentDropdownStructure(parentComponent,
      activeBaseComponent, dropdownStructure, componentType, componentStyle, parentLayer);
    // set here because not all nested components are removable, but the ones manually added by the user are
    newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
    return [newComponent, parentLayer];
  }

  private static updateGenericComponentDropdownOptionNames(selectedNestedComponent: WorkshopComponent): void {
    const parentLayer = ComponentPreviewStructureSearchUtils.getLayerByName(selectedNestedComponent,
      selectedNestedComponent.activeSubcomponentName);
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(selectedNestedComponent, parentLayer);
  }

  private static addNewSubcomponentToCurrentLayer(selectedNestedComponent: WorkshopComponent, nestedComponentBaseName: NESTED_COMPONENTS_BASE_NAMES): void {
    // AddNewNestedComponent.addNewSubcomponent(selectedNestedComponent, nestedComponentBaseName, selectedNestedComponent.activeSubcomponentName);
    AddNewNestedComponent.updateGenericComponentDropdownOptionNames(selectedNestedComponent);
  }

  private static addNewComponentToDefaultBaseLayer(selectedNestedComponent: WorkshopComponent, activeBaseComponent: WorkshopComponent,
      dropdownStructure: NestedDropdownStructure, nestedComponentBaseName: NESTED_COMPONENTS_BASE_NAMES): WorkshopComponent {
    const [newComponent, parentLayer] = AddNewNestedComponent.addNewComponent(selectedNestedComponent, nestedComponentBaseName,
      activeBaseComponent, dropdownStructure);
    const { componentPreviewStructure: { subcomponentNameToDropdownOptionName }, activeSubcomponentName } = activeBaseComponent;
    const activeParentComponentOptionName = subcomponentNameToDropdownOptionName[activeSubcomponentName];
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerDropdownStructure(
      activeBaseComponent, dropdownStructure[activeParentComponentOptionName] as NestedDropdownStructure, parentLayer.sections.alignedSections);
    return newComponent;
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
      AddNewGenericComponent.addComponentViaDropdownStructureSearch(
        selectedNestedComponent, AddNewNestedComponent.addNewComponentToDefaultBaseLayer, nestedComponentBaseName);
    } else {
      // WORK1 probably not needed
      AddNewNestedComponent.addNewSubcomponentToCurrentLayer(selectedNestedComponent, nestedComponentBaseName);
    }
  }
}

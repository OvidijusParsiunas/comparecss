import { UpdateGenericComponentDropdownOptionNames } from '../updateNestedComponentNames/updateGenericComponentDropdownOptionNames';
import { LAYER_COMPONENTS_BASE_NAMES, NESTED_COMPONENTS_BASE_NAMES } from '../../../../../../consts/baseSubcomponentNames.enum';
import { UpdateLayerDropdownOptionNames } from '../updateNestedComponentNames/updateLayerDropdownOptionNames';
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

  private static addNewComponentToLayer(selectedNestedComponent: WorkshopComponent, activeBaseComponent: WorkshopComponent,
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
    const numberOfLayers = selectedNestedComponent.componentPreviewStructure.layers.length;
    const startingIndex = numberOfLayers === 2 ? 0 : numberOfLayers - 1;
    UpdateLayerDropdownOptionNames.update(selectedNestedComponent, startingIndex);
  }

  private static addNewLayerToBase(selectedNestedComponent: WorkshopComponent, nestedComponentBaseName: string): void {
    const newComponent = AddNewLayerComponent.add(selectedNestedComponent, NestedComponentBaseNamesToStyles.LAYER_TO_STYLE[nestedComponentBaseName], true);
    newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
    AddNewNestedComponent.updateLayerComponentNames(selectedNestedComponent);
    newComponent.nestedComponentsLockedToLayer?.add(selectedNestedComponent);
  }

  public static add(currentlySelectedComponent: WorkshopComponent, nestedComponentBaseName: NESTED_COMPONENTS_BASE_NAMES): void {
    const selectedNestedComponent = currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].seedComponent.ref;
    if (Object.values(LAYER_COMPONENTS_BASE_NAMES).includes(nestedComponentBaseName as LAYER_COMPONENTS_BASE_NAMES)) {
      AddNewNestedComponent.addNewLayerToBase(selectedNestedComponent, nestedComponentBaseName);
    } else {
      AddNewGenericComponent.addComponentViaDropdownStructureSearch(
        selectedNestedComponent, AddNewNestedComponent.addNewComponentToLayer, nestedComponentBaseName);
    }
  }
}

import { UpdateGenericComponentDropdownOptionNames } from '../updateNestedComponentNames/updateGenericComponentDropdownOptionNames';
import { LAYER_COMPONENTS_BASE_NAMES, NESTED_COMPONENTS_BASE_NAMES } from '../../../../../../consts/baseSubcomponentNames.enum';
import { UpdateLayerDropdownOptionNames } from '../updateNestedComponentNames/updateLayerDropdownOptionNames';
import { ComponentTraversalState, TargetDetails } from '../../../../../../interfaces/componentTraversal';
import { ComponentPreviewStructureSearchUtils } from './utils/componentPreviewStractureSearchUtils';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { NestedComponentBaseNamesToStyles } from './utils/nestedComponentBaseNamesToStyles';
import ComponentTraversalUtils from '../../componentTraversal/componentTraversalUtils';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ActiveComponentUtils } from '../../activeComponent/activeComponentUtils';
import { AddNewGenericComponent } from './add/addNewGenericComponent';
import { AddNewLayerComponent } from './add/addNewLayerComponent';

export class AddNewNestedComponent {

  private static addNewSubcomponent(selectedNestedComponent: WorkshopComponent, nestedComponentBaseName: NESTED_COMPONENTS_BASE_NAMES,
      layerName: string, activeBaseComponent: WorkshopComponent, dropdownStructure: NestedDropdownStructure): void {
    const nestedComponentType = AddNewGenericComponent.componentBaseNameToType[nestedComponentBaseName];
    const nestedComponentStyle = NestedComponentBaseNamesToStyles.genericToStyle(nestedComponentBaseName);
    const newComponent = AddNewGenericComponent.addWithDropdown(selectedNestedComponent, nestedComponentType, nestedComponentStyle, layerName, activeBaseComponent, dropdownStructure);
    // set here because not all nested components are removable, but the ones added by the user are
    newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
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

  // WORK3: refactor
  private static addNewSubcomponentToDefaultBaseLayer(selectedNestedComponent: WorkshopComponent, nestedComponentBaseName: NESTED_COMPONENTS_BASE_NAMES,
      activeBaseComponent: WorkshopComponent, dropdownStructure: NestedDropdownStructure): void {
    const { parentNestedComponent, parentLayer } = ActiveComponentUtils.getParentComponentProperties(selectedNestedComponent, true);
    AddNewNestedComponent.addNewSubcomponent(parentNestedComponent, nestedComponentBaseName, parentLayer.name, activeBaseComponent, dropdownStructure);
    const parentNestedComponentDropdownOptionName = activeBaseComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[Object.keys(parentNestedComponent.componentPreviewStructure.subcomponentDropdownStructure)[0]];
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerDropdownStructure(activeBaseComponent, (dropdownStructure[parentNestedComponentDropdownOptionName] || dropdownStructure[activeBaseComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[parentLayer.name]]) as NestedDropdownStructure, parentLayer.sections.alignedSections);
  }

  // can be renamed to addNewSubcomponentToLayer
  // WORK3: repeatable
  private static addNewSubcomponentToDefaultBaseLayerIfFound(selectedNestedComponent: WorkshopComponent, nestedComponentBaseName: NESTED_COMPONENTS_BASE_NAMES,
      componentTraversalState: ComponentTraversalState): ComponentTraversalState {
    const targetDetails = this as any as TargetDetails;
    if (ComponentTraversalUtils.isActualObjectNameMatching(targetDetails, componentTraversalState)) {
      const { subcomponentDropdownStructure } = componentTraversalState;
      AddNewNestedComponent.addNewSubcomponentToDefaultBaseLayer(selectedNestedComponent, nestedComponentBaseName, targetDetails.parentComponent, subcomponentDropdownStructure);
      return componentTraversalState;
    }
    return null;
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
      // WORK3: repeatable
      const activeBaseComponent = ActiveComponentUtils.getActiveBaseComponent(selectedNestedComponent);
      const targetDetails = ComponentTraversalUtils.generateTargetDetails(activeBaseComponent, activeBaseComponent.activeSubcomponentName);
      ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
        activeBaseComponent.componentPreviewStructure.subcomponentDropdownStructure,
        AddNewNestedComponent.addNewSubcomponentToDefaultBaseLayerIfFound.bind(targetDetails, selectedNestedComponent, nestedComponentBaseName));
    } else {
      // WORK1 probably not needed
      AddNewNestedComponent.addNewSubcomponentToCurrentLayer(selectedNestedComponent, nestedComponentBaseName);
    }
  }
}
